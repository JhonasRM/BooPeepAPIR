import {
  DocumentData,
  Firestore,
  getFirestore,
} from "firebase-admin/firestore";
import { User } from "../Model/User";
import { conn } from "../../Data Access/DAO/conn";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
import { Auth } from "firebase-admin/lib/auth/auth";
import { UserRecord } from "firebase-admin/lib/auth/user-record";
export class UsersRepository {
  private db: Firestore;
  private collectionPath: string;
  private auth: Auth;
  private provider: GoogleAuthProvider;
  constructor() {
    this.db = conn.firestore();
    this.auth = conn.auth();
    this.collectionPath = "users";
    this.provider = new GoogleAuthProvider();
  }
  async findByEmail(
    email: string
  ): Promise<{ valido: boolean; value?: User; erro?: string }> {
    try {
      const userRecord = await this.auth.getUserByEmail(email);
      const user = userRecord.toJSON();
      return { valido: true, value: user as User, erro: undefined };
    } catch (error) {
      if (error instanceof Error) {
        const mensagemErro = error.message;
        return { valido: false, erro: mensagemErro };
      } else {
        return { valido: false, erro: "Erro desconhecido ao validar o texto" };
      }
    }
  }

  async getAllUsers(): Promise<{ valido: boolean; value?: User[]; erro?: string }> {
    try {
      const listUsersResult = await this.auth.listUsers()
      const users: User[] = []
      listUsersResult.users.forEach((userRecord: UserRecord) => {
        users.push(userRecord.toJSON() as User)
      })
      console.log(users)
      return { valido: true, value: users }
    } catch (error) {
      if (error instanceof Error) {
        const mensagemErro = error.message;
        return { valido: false, erro: mensagemErro };
      } else {
        return {
          valido: false, erro: "Erro desconhecido ao validar o texto",
        };
      }
    }
  }

  async save(
    user: User
  ): Promise<{ valido: boolean; value?: User; erro?: string }> {
    try {
      const userRecord = await this.auth.createUser(user);
      const createdUser = userRecord.toJSON();
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


  async delete(user: User): Promise<{ valido: boolean; value?: string; erro?: string }> {
    try {
      const deletedUser = await this.auth.deleteUser(user.uid)
      return { valido: true, value: 'Usuario deletado com sucesso', erro: undefined };
    } catch (error) {
      if (error instanceof Error) {
        const mensagemErro = error.message;
        return { valido: false, erro: mensagemErro };
      } else {
        return { valido: false, erro: "Erro desconhecido ao validar o texto" };
      }
    }
  }

  async update(uid: string,
    user: User
  ): Promise<{ valido: boolean; value?: User; erro?: string }> {
    try {
      const userRecord = await this.auth.updateUser(user.uid, user);
      const updatedUser = userRecord.toJSON()
      return { valido: true, value: updatedUser as User, erro: undefined };
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
