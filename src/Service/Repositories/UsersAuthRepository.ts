import { getAuth, sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import { Auth } from "firebase-admin/lib/auth/auth";
import { UserRecord } from "firebase-admin/lib/auth/user-record";
import { UsersFireStoreRepository } from "./UsersFireStoreRepository";
import { UserOnAuth } from "../Model/UserOnAuth";
import { AppWeb } from "../../Data Access/DAO/AppWeb/appWeb";
import { AppAdmin } from "../../Data Access/DAO/AppAdmin/appAdmin";

export class UsersAuthRepository {
  private auth: Auth;
  private Authapp
  constructor() {
    this.auth = AppAdmin.auth();
    this.Authapp = getAuth(AppWeb)
  }
  async findByEmail(
    email: string
  ): Promise<{ valido: boolean; value?: UserOnAuth; erro?: string }> {
    try {
      const userRecord = await this.auth.getUserByEmail(email);
      const user = userRecord.toJSON();
      return { valido: true, value: user as UserOnAuth, erro: undefined };
    } catch (error) {
      if (error instanceof Error) {
        const mensagemErro = error.message;
        return { valido: false, erro: mensagemErro };
      } else {
        return { valido: false, erro: "Erro desconhecido ao validar o texto" };
      }
    }
  }

  async getAllUsers(): Promise<{
    valido: boolean;
    value?: UserOnAuth[];
    erro?: string;
  }> {
    try {
      const listUsersResult = await this.auth.listUsers();
      const users: UserOnAuth[] = [];
      listUsersResult.users.forEach((userRecord: UserRecord) => {
        users.push(userRecord.toJSON() as UserOnAuth);
      });
      return { valido: true, value: users };
    } catch (error) {
      if (error instanceof Error) {
        const mensagemErro = error.message;
        return { valido: false, erro: mensagemErro };
      } else {
        return {
          valido: false,
          erro: "Erro desconhecido ao validar o texto",
        };
      }
    }
  }

  async saveOnAuth(
    user: UserOnAuth
  ): Promise<{ valido: boolean; value?: UserOnAuth; erro?: string }> {
    try {
      
      const userRecord = await this.auth.createUser(user);
      const createdUser = userRecord.toJSON();
      return {
        valido: true,
        value: createdUser as UserOnAuth,
        erro: undefined,
      };
    } catch (error) {
      if (error instanceof Error) {
        const mensagemErro = error.message;
        return { valido: false, erro: mensagemErro };
      } else {
        return { valido: false, erro: "Erro desconhecido ao validar o texto" };
      }
    }
  }
  
  async loginOnAuth(
    email: string,
    password: string
  ): Promise<{ valido: boolean; value?: UserOnAuth; erro?: string }> {
   
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
      return { valido: true, value: user as UserOnAuth }
     } catch (error: unknown) {
      if (error instanceof Error) {
        const mensagemErro = error.message;
        return { valido: false, erro: mensagemErro };
      } else {
        return { valido: false, erro: "Erro desconhecido ao realizar o login" };
      }
    }
  }

  async delete(
    uid: string
  ): Promise<{ valido: boolean; value?: string; erro?: string }> {
    try {
      const deletedUser = await this.auth.deleteUser(uid);
      return {
        valido: true,
        value: "Usuario deletado com sucesso",
        erro: undefined,
      };
    } catch (error) {
      if (error instanceof Error) {
        const mensagemErro = error.message;
        return { valido: false, erro: mensagemErro };
      } else {
        return { valido: false, erro: "Erro desconhecido ao validar o texto" };
      }
    }
  }

  async resetPassword(user: UserOnAuth): Promise<{ valido: boolean; value?: string; erro?: string }>{
    try {
      const link = await this.auth.generatePasswordResetLink(user.email)
      const sendEmail = await sendPasswordResetEmail(this.Authapp, user.email)
      return { valido: true, value: link}
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message)
        const mensagemErro = error.message;
        return { valido: false, erro: mensagemErro };
      } else {
        return { valido: false, erro: "Erro desconhecido ao validar o texto" };
      }
    }
  }

  async update(
    uid: string,
    fieldToUpdate: string,
    newValue: any
  ): Promise<{ valido: boolean; value?: UserOnAuth; erro?: string }> {
      try {    
        switch (fieldToUpdate) {
          case 'displayName':
            await this.auth.updateUser(uid, { displayName: newValue });
            break;
          case 'email':
            await this.auth.updateUser(uid, { email: newValue });
            break;
          case 'phoneNumber':
            await this.auth.updateUser(uid, { phoneNumber: newValue });
            break;
         
          default:
            throw new Error(`Campo '${fieldToUpdate}' não é suportado para atualização.`);
        }
        // console.log(`Campo '${fieldToUpdate}' atualizado com sucesso para '${newValue}'.`);

        const updatedUser = await this.auth.getUser(uid)
        const user = new UserOnAuth(updatedUser.displayName as string, updatedUser.email as string, '', updatedUser.emailVerified, updatedUser.disabled, updatedUser.uid)
        return { valido: true, value: user };
      } catch (error) {
        console.error('Erro ao atualizar usuário:', error);
        if(error instanceof Error){
        return { valido: false, erro: error.message };
      }
      return { valido: false, erro: 'Erro Interno do Servidor'}
      } 
  }
}

