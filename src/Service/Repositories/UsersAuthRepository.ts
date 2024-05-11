import { Firestore } from "firebase-admin/firestore";
import { conn } from "../../Data Access/DAO/conn";
import { GoogleAuthProvider, User, UserCredential } from "firebase/auth";

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
  ): Promise<{ valido: boolean; value?: string; erro?: string }> {
    try {
      const userRecord = await this.auth.getUser(uid);
      if (fieldToUpdate in userRecord) {
        const customClaims = userRecord.customClaims as { [key: string]: any };
        customClaims[fieldToUpdate] = newValue;

        // Atualiza o usuário com os novos claims
        await this.auth.setCustomUserClaims(uid, customClaims);
        console.log(
          `Campo ${fieldToUpdate} do usuário ${uid} atualizado para ${newValue}`
        );

        const updatedUser = await this.auth.getUser(uid)

        return {
          valido: true,
          value: 'Usuário Alterado com sucesso',
          erro: undefined,
        };
      }
      throw new Error(`O campo ${fieldToUpdate} não existe no usuário ${uid}`);
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
