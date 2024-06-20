import { UserOnFirestore } from "../Model/UserOnFireStore";
import { AppAdmin } from "../../Data Access/DAO/AppAdmin/appAdmin";
import { IReturnAdapter } from "../../utils/Interfaces/IReturnAdapter";
import { Firestore } from "firebase-admin/firestore";
import { IUserRepository } from "../../utils/Interfaces/IUserRepository";
import dotenv from "dotenv";
import { decrypt, encrypt } from "../../utils/encryption/encryption";
import { User } from "../Entities/User";

dotenv.config();
export class UserFireStoreRepository implements Omit<IUserRepository, "auth"> {
  db: Firestore;
  collectionPath: string;
  constructor() {
    this.db = AppAdmin.firestore();
    this.collectionPath = "users";
  }

  async getUser(key: string): Promise<IReturnAdapter> {
    try {
      const collectionRef = this.db.collection(this.collectionPath);
      const query = await collectionRef.doc(key).get();
      if (!query.exists) {
        throw new Error("Usuário não encontrado");
      }
      const user: UserOnFirestore = query.data() as UserOnFirestore;
      const userForDecrypt = new UserOnFirestore(
        user.uid as string,
        user.postsID,
        user.chatID,
        user.course,
        user.shift,
        user.description
      );
      const decryptedUser = await userForDecrypt.decryptUser(
        userForDecrypt.uid as string,
        userForDecrypt.postsID,
        userForDecrypt.chatID,
        userForDecrypt.course,
        userForDecrypt.shift,
        userForDecrypt.description
      );
      console.log(decryptedUser)
      return { val: true, data: decryptedUser };
    } catch (error) {
      if (error instanceof Error) {
        const mensagemErro = error.message;
        return { val: false, erro: mensagemErro };
      } else {
        return {
          val: false,
          erro: `Erro desconhecido ao validar o texto: ${error}`,
        };
      }
    }
  }

  async getUsers(): Promise<IReturnAdapter> {
    console.log("Buscando data dos usuários...");
    try {
      const collectionRef = this.db.collection(this.collectionPath);
      const querySnapshot = await collectionRef.get();
      const users: UserOnFirestore[] = [];
      querySnapshot.forEach((doc) => {
        const userData = doc.data() as UserOnFirestore;
        const userDataForDecrypt = new UserOnFirestore(
          userData.uid as string,
          userData.postsID,
          userData.chatID
        );
        const decryptedData = userDataForDecrypt.decryptUser(
          userDataForDecrypt.uid as string,
          userDataForDecrypt.postsID,
          userDataForDecrypt.chatID
        );
        users.push(decryptedData);
      });
      if (users[1] instanceof UserOnFirestore) {
        return { val: true, data: users as UserOnFirestore[] };
      }
      throw new Error("Nenhum usuário encontrado");
    } catch (error) {
      if (error instanceof Error) {
        const mensagemErro = error.message;
        return { val: false, erro: mensagemErro };
      } else {
        return { val: false, erro: "Erro desconhecido ao validar o texto" };
      }
    }
  }

  async create(user: UserOnFirestore): Promise<IReturnAdapter> {
    try {
      const docRef = await this.db.collection(this.collectionPath).doc();
      const uid = await docRef.id;
      const encryptuid = encrypt(uid);
      const NewUser: UserOnFirestore = new UserOnFirestore(encryptuid);
      const NewUserEncrypted = NewUser.encryptUser(
        NewUser.uid as string,
        NewUser.postsID,
        NewUser.chatID,
        NewUser.course,
        NewUser.shift,
        NewUser.description
      );
      const NewUserData: FirebaseFirestore.DocumentData = NewUserEncrypted;
      const data = { ...NewUserData };
      const createdUser = await docRef.set(data);
      return { val: true, data: uid as string };
    } catch (error) {
      if (error instanceof Error) {
        console.log(error);
        const mensagemErro = error.message;
        return { val: false, erro: mensagemErro };
      } else {
        return { val: false, erro: "Erro desconhecido ao validar o texto" };
      }
    }
  }

  async delete(uid: string): Promise<IReturnAdapter> {
    try {
      const userQuerySnapshot = await this.db
        .collection(this.collectionPath)
        .doc(uid)
        .get();
      if (userQuerySnapshot.exists) {
        await userQuerySnapshot.ref.delete();
        return { val: true, data: "Usuário deletado com sucesso" };
      }
      throw new Error("Nenhum usuário encontrado");
    } catch (error) {
      if (error instanceof Error) {
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
    newValue: any
  ): Promise<IReturnAdapter> {
    try {
      const userRef = this.db.collection(this.collectionPath).doc(uid);
      const userSnapshot = await userRef.get();
      console.log(userSnapshot.data());
      const userData = userSnapshot.data() as User;
      if (!userData || !userData.hasOwnProperty(fieldToUpdate)) {
        throw new Error("O campo mencionado para ser atualizado não existe");
      }

      const previousValue = userData[fieldToUpdate as keyof User];
      if (typeof previousValue !== typeof newValue) {
        throw new Error(
          `O tipo do valor anterior ${previousValue} não corresponde ao tipo do novo valor ${newValue}.`
        );
      }
      const encryptedNewValue = encrypt(newValue);
      if(fieldToUpdate === 'postsID'){
        userData.postsID.push(encryptedNewValue)
        await userRef.update({ postsID: userData.postsID });
      } else{
      await userRef.update({
        [fieldToUpdate]: encryptedNewValue,
      });}
      return { val: true, data: "Usuário atualizado com sucesso" };
    } catch (error) {
      if (error instanceof Error) {
        const mensagemErro = error.message;
        return { val: false, erro: mensagemErro };
      } else {
        return { val: false, erro: "Erro desconhecido ao validar o texto" };
      }
    }
  }
}
