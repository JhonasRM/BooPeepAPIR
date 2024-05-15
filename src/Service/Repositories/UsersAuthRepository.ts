import { Firestore } from "firebase-admin/firestore";
import { conn } from "../../Data Access/DAO/conn";
import { GoogleAuthProvider } from "firebase/auth";

import { Auth } from "firebase-admin/lib/auth/auth";
import { UserRecord } from "firebase-admin/lib/auth/user-record";
import { UsersFireStoreRepository } from "./UsersFireStoreRepository";
import { UserOnAuth } from "../Model/UserOnAuth";

export class UsersAuthRepository {
  private usersFireStoreReposiroty: UsersFireStoreRepository;
  private collectionPath: string;
  private auth: Auth;
  private provider: GoogleAuthProvider;
  constructor() {
    this.usersFireStoreReposiroty = new UsersFireStoreRepository();
    this.auth = conn.auth();
    this.collectionPath = "users";
    this.provider = new GoogleAuthProvider();
  }
  async findByEmail(
    email: string
  ): Promise<{ valido: boolean; value?: UserOnAuth; erro?: string }> {
    try {
      console.log(`entrou o email: ${email}`)
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
      console.log(users);
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

  async update(
    uid: string,
    fieldToUpdate: string,
    newValue: any
  ): Promise<{ valido: boolean; value?: UserOnAuth; erro?: string }> {
      try {    
        // Atualize o campo desejado
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
        console.log(`Campo '${fieldToUpdate}' atualizado com sucesso para '${newValue}'.`);

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
