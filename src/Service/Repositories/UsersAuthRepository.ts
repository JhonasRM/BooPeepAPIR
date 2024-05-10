import {
  Firestore,
} from "firebase-admin/firestore";
import { conn } from "../../Data Access/DAO/conn";
import {
  GoogleAuthProvider,
  UserCredential,
} from "firebase/auth";

import { Auth } from "firebase-admin/lib/auth/auth";
import { UserRecord } from "firebase-admin/lib/auth/user-record";
import { UsersFireStoreRepository } from "./UsersFireStoreRepository";
import { UserOnAuth } from "../Model/UserOnAuth";


export class UsersAuthRepository {
  private usersFireStoreReposiroty: UsersFireStoreRepository
  private collectionPath: string;
  private auth: Auth;
  private provider: GoogleAuthProvider;
  constructor() {
    this.usersFireStoreReposiroty = new UsersFireStoreRepository()
    this.auth = conn.auth();
    this.collectionPath = "users";
    this.provider = new GoogleAuthProvider();
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
      const SaveOnFireStore = await  this.usersFireStoreReposiroty.saveOnFireStore(user)
            if(SaveOnFireStore.valido === false){
        throw new Error(`Erro de Criação do Usuário no FireStore: ${SaveOnFireStore.erro}`)
      }
      return { valido: true, value: createdUser as User, erro: undefined };
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
    user: UserOnAuth
  ): Promise<{ valido: boolean; value?: string; erro?: string }> {
    try {
      const deletedUser = await this.auth.deleteUser(user.uid);
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
    user: UserOnAuth
  ): Promise<{ valido: boolean; value?: UserOnAuth; erro?: string }> {
    try {
      const userRecord = await this.auth.updateUser(uid, user);
      const updatedUser = userRecord.toJSON();
      return { valido: true, value: updatedUser as UserOnAuth, erro: undefined };
    } catch (error) {
      if (error instanceof Error) {
        const mensagemErro = error.message;
        return { valido: false, erro: mensagemErro };
      } else {
        return { valido: false, erro: "Erro desconhecido ao validar o texto" };
      }
    }
  }
}
