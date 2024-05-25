import { UserOnFirestore } from "../Model/UserOnFireStore";
import { AppAdmin } from "../../Data Access/DAO/AppAdmin/appAdmin";
import { IReturnAdapter } from "../Interfaces/IReturnAdapter";
import { Firestore } from "firebase-admin/firestore";
import { IUserRepository } from "../Interfaces/IUserRepository";
import { Auth } from "firebase-admin/lib/auth/auth";

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
                const user = query.docs[0].data()

                return { val: true, data: user as unknown as UserOnFirestore }
            
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
                users.push(userData);
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
        const Newuser: UserOnFirestore = new UserOnFirestore({})
        const NewUserData: FirebaseFirestore.DocumentData = Newuser
      try {
          const docRef = await this.db.collection(this.collectionPath).doc()
          const uid = docRef.id; 
          const data = { ...NewUserData, uid }
          const createdUser = await docRef.set(data);
          return { val: true, data:data as UserOnFirestore , erro: undefined };
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
  
          await userRef.update({
              [fieldToUpdate]: newValue
          });

          const updatedUser = await this.db.collection(this.collectionPath).doc(uid).get();
          const user: UserOnFirestore = UserOnFirestore.fromDocumentSnapshot(updatedUser)
            return { val: true, data: user}
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