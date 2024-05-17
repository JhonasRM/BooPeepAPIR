import { DocumentData, Firestore, getFirestore } from "firebase-admin/firestore";
import { User } from "../Model/User";
import * as admin from 'firebase-admin';
import { UserOnFirestore } from "../Model/UserOnFireStore";
import { UserOnAuth } from "../Model/UserOnAuth";
import { AppAdmin } from "../../Data Access/DAO/AppAdmin/appAdmin";
export class UsersFireStoreRepository {
    private db: Firestore
    private collectionPath: string
    constructor(){
        this.db = AppAdmin.firestore()
        this.collectionPath = 'users'
    }
    async findByEmail(email: string): Promise<{ valido: boolean; value?: UserOnFirestore; erro?: string }>{
        const field = 'email';
        const value = email;

        try {
            const collectionRef = this.db.collection(this.collectionPath);
            const query = await collectionRef.where(field, "==", value).get();
            if (query.empty) {
                throw new Error('No documents found')
            } 
                const user = query.docs[0].data()

                return { valido: true, value: user as unknown as UserOnFirestore }
            
        } catch (error) {
                if (error instanceof Error) {
                  const mensagemErro = error.message;
                  return { valido: false, erro: mensagemErro };
                } else {
                  return { valido: false, erro: "Erro desconhecido ao validar o texto" };
                }
              }
        }
      
        async loginOnFireStore(
          email: string,
          password: string
        ): Promise<{ valido: boolean; value?: UserOnFirestore; erro?: string }> {
         
          try {
            const login = await this.findByEmail(email)
            if(login.valido === false){
              throw new Error(login.erro)
            }
            const user = login.value as UserOnFirestore
            if(password === user.password){
            return { valido: true, value: user};
            }
            throw new Error('A senha está incorreta')
          } catch (error: unknown) {
            if (error instanceof Error) {
              const mensagemErro = error.message;
              return { valido: false, erro: mensagemErro };
            } else {
              return { valido: false, erro: "Erro desconhecido ao realizar o login" };
            }
          }
        }
      
    
    async getAllUsers(): Promise<{ valido: boolean; value?: UserOnFirestore[]; erro?: string }>{
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
            return { valido: true, value: users as UserOnFirestore[]}
        } catch (error) {
            if (error instanceof Error) {
              const mensagemErro = error.message;
              return { valido: false, erro: mensagemErro };
            } else {
              return { valido: false, erro: "Erro desconhecido ao validar o texto" };
            }
          }

    }

    async saveOnFireStore(
        user: UserOnFirestore
      ): Promise<{ valido: boolean; value?: UserOnFirestore; erro?: string }> {
        const Newuser: UserOnFirestore = new UserOnFirestore({
          email: user.email,
          password: user.password
        })
        const NewUserData: FirebaseFirestore.DocumentData = Newuser
      try {
        console.log('criando usuário no database')
          const docRef = await this.db.collection(this.collectionPath).doc()
          const uid = docRef.id; 
          const data = { ...NewUserData, uid }
          const createdUser = await docRef.set(data);
          console.log(`${createdUser.writeTime} Usuário criado`)
          return { valido: true, value:data as UserOnFirestore , erro: undefined };
        } catch (error) {
          if (error instanceof Error) {
            console.log(error)
            const mensagemErro = error.message;
            return { valido: false, erro: mensagemErro };
          } else {
            return { valido: false, erro: "Erro desconhecido ao validar o texto" };
          }
        }
      }
      
    
    async delete(user: UserOnAuth): Promise<{ valido: boolean; value?: string; erro?: string }> {
        try {
            const userQuerySnapshot = await this.db.collection(this.collectionPath)
                .where('email', '==', user.email)
                .get();
            if (userQuerySnapshot.empty) {
                throw new Error('Nenhum usuário encontrado');
            }
            userQuerySnapshot.forEach(async doc => {
                await doc.ref.delete();
            });
            return { valido: true, value: 'Usuário deletado com sucesso'}
        } catch (error) {
            if (error instanceof Error) {
              const mensagemErro = error.message;
              return { valido: false, erro: mensagemErro };
            } else {
              return { valido: false, erro: "Erro desconhecido ao validar o texto" };
            }
          }
    }

    async update(uid: string, fieldToUpdate: string, newValue: any): Promise<{ valido: boolean; value?: UserOnFirestore; erro?: string }>{
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
            return { valido: true, value: user}
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