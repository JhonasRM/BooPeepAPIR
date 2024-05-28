import { UserOnFirestore } from "../Model/UserOnFireStore";
import { AppAdmin } from "../../Data Access/DAO/AppAdmin/appAdmin";
import { IReturnAdapter } from "../Interfaces/IReturnAdapter";
import { Firestore } from "firebase-admin/firestore";
import { IUserRepository } from "../Interfaces/IUserRepository";
import dotenv from 'dotenv';
import { decrypt, encrypt } from "../Model/encryption";

dotenv.config();
export class UserFireStoreRepository implements Omit<IUserRepository, 'auth'>{
    db: Firestore
    collectionPath: string
    constructor(){
        this.db = AppAdmin.firestore()
        this.collectionPath = 'users'
    }
  

    async getUser(key: string): Promise<IReturnAdapter>{
        const field = 'uid';
        const value = key;
        try {
            const collectionRef = this.db.collection(this.collectionPath);
            const query = await collectionRef.where(field, "==", value).get();
            if (query.empty) {
                throw new Error('No documents found')
            } 
                const user = query.docs[0].data() as UserOnFirestore
                const decryptedUser = user.decryptUser(user.uid as string, user.postsID, user.chatID)
                return { val: true, data: decryptedUser }
            
        } catch (error) {
                if (error instanceof Error) {
                  const mensagemErro = error.message;
                  return { val: false, erro: mensagemErro };
                } else {
                  return { val: false, erro: "Erro desconhecido ao validar o texto" };
                }
              }
        }
      
      
    
    async getUsers(): Promise<IReturnAdapter>{
        try {
            const collectionRef = this.db.collection(this.collectionPath);
            const querySnapshot = await collectionRef.get();
            const users: UserOnFirestore[] = [];
            querySnapshot.forEach((doc) => {
                const userData = doc.data() as UserOnFirestore;
                const decryptedData = userData.decryptUser(userData.uid as string, userData.postsID, userData.chatID)
                users.push(decryptedData);
            });
            if (users[1] === null) {
               throw new Error('Nenhum usuário encontrado')
            }
            return { val: true, data: users as UserOnFirestore[]}
        } catch (error) {
            if (error instanceof Error) {
              const mensagemErro = error.message;
              return { val: false, erro: mensagemErro };
            } else {
              return { val: false, erro: "Erro desconhecido ao validar o texto" };
            }
          }

    }

    async create(
        user: UserOnFirestore
      ): Promise<IReturnAdapter> {
        const NewUser: UserOnFirestore = new UserOnFirestore(user.uid)
        const NewUserEncrypted = NewUser.encryptUser(NewUser.uid as string, NewUser.postsID, NewUser.chatID)
        const NewUserData: FirebaseFirestore.DocumentData = NewUserEncrypted
      try {
          const docRef = await this.db.collection(this.collectionPath).doc()
          const uid = encrypt(docRef.id)
          const data = { ...NewUserData, uid}
          const createdUser = await docRef.set(data);
          return { val: true, data: uid };
        } catch (error) {
          if (error instanceof Error) {
            console.log(error)
            const mensagemErro = error.message;
            return { val: false, erro: mensagemErro };
          } else {
            return { val: false, erro: "Erro desconhecido ao validar o texto" };
          }
        }
      }
      
    
    async delete(uid: string): Promise<IReturnAdapter> {
        try {
            const userQuerySnapshot = await this.db.collection(this.collectionPath)
                .where('uid', '==', uid)
                .get();
            if (userQuerySnapshot.empty) {
                throw new Error('Nenhum usuário encontrado');
            }
            userQuerySnapshot.forEach(async doc => {
                await doc.ref.delete();
            });
            return { val: true, data: 'Usuário deletado com sucesso'}
        } catch (error) {
            if (error instanceof Error) {
              const mensagemErro = error.message;
              return { val: false, erro: mensagemErro };
            } else {
              return { val: false, erro: "Erro desconhecido ao validar o texto" };
            }
          }
    }

    async update(uid: string, fieldToUpdate: string, newValue: any): Promise<IReturnAdapter>{
        try {
          const userRef = this.db.collection(this.collectionPath).doc(uid);
          const userSnapshot = await userRef.get();

          if (!userSnapshot.exists) {
              throw new Error('Documento não encontrado.')
          }
  
          const userData = userSnapshot.data();
          if (!userData || !userData.hasOwnProperty(fieldToUpdate)) {
              throw new Error(`O campo '${fieldToUpdate}' não existe no documento.`);
          }
  
          const previousValue = userData[fieldToUpdate];
          if(fieldToUpdate === 'password'){
            if(previousValue === newValue){
              throw new Error('A nova senha não pode ser igual a anterior')
            }
          }
          if (typeof previousValue !== typeof newValue) {
              throw new Error(`O tipo do valor anterior ${previousValue} não corresponde ao tipo do novo valor ${newValue}.`)
          }
          const encryptedNewValue = encrypt(newValue)
  
          await userRef.update({
              [fieldToUpdate]: encryptedNewValue
          });
            return { val: true, data: 'Usuário atualizado com sucesso'}
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