import { confirmPasswordReset, getAuth, sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import { Auth } from "firebase-admin/lib/auth/auth";
import { UserRecord } from "firebase-admin/lib/auth/user-record";
import { UserOnAuth } from "../Model/UserOnAuth";
import { AppWeb } from "../../Data Access/DAO/AppWeb/appWeb";
import { AppAdmin } from "../../Data Access/DAO/AppAdmin/appAdmin";
import { IUserRepository } from "../Interfaces/IUserRepository";
import { IReturnAdapter } from "../Interfaces/IReturnAdapter";
import { UserOnFirestore } from "../Model/UserOnFireStore";

export class UserAuthRepository implements  Omit<IUserRepository, 'db' | 'collectionPath'>{
   auth: Auth;
   Authapp
  constructor() {
    this.auth = AppAdmin.auth();
    this.Authapp = getAuth(AppWeb)
  }

  async getUser(
    key: string
  ): Promise<IReturnAdapter> {
    try {
      const userRecord = await this.auth.getUserByEmail(key);
      const user = userRecord.toJSON();
      return { val: true, data: user as UserOnAuth, erro: undefined };
    } catch (error) {
      if (error instanceof Error) {
        const mensagemErro = error.message;
        return { val: false, erro: mensagemErro };
      } else {
        return { val: false, erro: "Erro desconhecido ao validar o texto" };
      }
    }
  }

  async getUsers(): Promise<IReturnAdapter> {
    try {
      const listUsersResult = await this.auth.listUsers();
      const users: UserOnAuth[] = [];
      listUsersResult.users.forEach((userRecord: UserRecord) => {
        users.push(userRecord.toJSON() as UserOnAuth);
      });
      return { val: true, data: users };
    } catch (error) {
      if (error instanceof Error) {
        const mensagemErro = error.message;
        return { val: false, erro: mensagemErro };
      } else {
        return {
          val: false,
          erro: "Erro desconhecido ao validar o texto",
        };
      }
    }
  }

  async create(
    user: UserOnAuth
  ): Promise<IReturnAdapter> {
    const userAuth = user
    try {
      const userRecord = await this.auth.createUser(userAuth);
      const createdUser = userRecord.toJSON();
      const user = createdUser as UserOnAuth
      const uid = user.uid
      return {
        val: true,
        data: uid,
        erro: undefined,
      };
    } catch (error) {
      if (error instanceof Error) {
        const mensagemErro = error.message;
        return { val: false, erro: mensagemErro };
      } else {
        return { val: false, erro: "Erro desconhecido ao validar o texto" };
      }
    }
  }
  
  async loginOnAuth(
    email: string,
    password: string
  ): Promise<IReturnAdapter> {
   
    try {
      const loginAuth = await signInWithEmailAndPassword(this.Authapp, email, password)
      const user: UserOnAuth = new UserOnAuth(
        loginAuth.user.displayName as string,
        loginAuth.user.email as string,
        '',
        loginAuth.user.emailVerified,
        false,
        loginAuth.user.uid
      )    
      return { val: true, data: user as UserOnAuth }
     } catch (error: unknown) {
      if (error instanceof Error) {
        const mensagemErro = error.message;
        return { val: false, erro: mensagemErro };
      } else {
        return { val: false, erro: "Erro desconhecido ao realizar o login" };
      }
    }
  }

  async delete(
    uid: string
  ): Promise<IReturnAdapter> {
    try {
      const deletedUser = await this.auth.deleteUser(uid);
      return {
        val: true,
        data: "Usuario deletado com sucesso",
        erro: undefined,
      };
    } catch (error) {
      if (error instanceof Error) {
        const mensagemErro = error.message;
        return { val: false, erro: mensagemErro };
      } else {
        return { val: false, erro: "Erro desconhecido ao validar o texto" };
      }
    }
  }


  async resetPassword(user: UserOnAuth): Promise<IReturnAdapter>{
    try {
      const sendEmail = await sendPasswordResetEmail(this.Authapp, user.email)
      return { val: true, data: 'Email enviado com sucesso'}
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message)
        const mensagemErro = error.message;
        return { val: false, erro: mensagemErro };
      } else {
        return { val: false, erro: "Erro desconhecido ao validar o texto" };
      }
    }
  }

  async update(
    uid: string,
    fieldToUpdate: string,
    newdata: any,
    token?: string
  ): Promise<IReturnAdapter> {
      try {    
        switch (fieldToUpdate) {
          case 'displayName':
            await this.auth.updateUser(uid, { displayName: newdata });
            break;
          case 'email':
            await this.auth.updateUser(uid, { email: newdata });
            break;
          case 'phoneNumber':
            await this.auth.updateUser(uid, { phoneNumber: newdata });
            break;
          case 'password':
            await confirmPasswordReset(this.Authapp, token as string, newdata)
          default:
            throw new Error(`Campo '${fieldToUpdate}' não é suportado para atualização.`);
        }

        const updatedUser = await this.auth.getUser(uid)
        const user = new UserOnAuth(updatedUser.displayName as string, updatedUser.email as string, '', updatedUser.emailVerified, updatedUser.disabled, updatedUser.uid)
        return { val: true, data: user };
      } catch (error) {
        console.error('Erro ao atualizar usuário:', error);
        if(error instanceof Error){
        return { val: false, erro: error.message };
      }
      return { val: false, erro: 'Erro Interno do Servidor'}
      } 
  }
}

