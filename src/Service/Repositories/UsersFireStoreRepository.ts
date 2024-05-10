import { DocumentData, Firestore, getFirestore } from "firebase-admin/firestore";
import { User } from "../Model/User";
import { conn } from "../../Data Access/DAO/conn";
import * as admin from 'firebase-admin';
import { UserOnFirestore } from "../Model/UserOnFireStore";
import { UserOnAuth } from "../Model/UserOnAuth";
export class UsersFireStoreRepository {
    private db: Firestore
    private collectionPath: string
    constructor(){
        this.db = conn.firestore()
        this.collectionPath = 'users'
    }
    async findByEmail(email: string): Promise<{ valido: boolean; value?: UserOnFirestore; erro?: string }>{
        const field = 'email';
        const value = email;

        try {
            const collectionRef = this.db.collection(this.collectionPath);
            const query = collectionRef.where(field, "==", value);
            const querySnapshot = await query.get();

            if (querySnapshot.empty) {
                throw new Error('No documents found')
            } else {
                let user: User | null = null;

                querySnapshot.forEach((doc) => {
                    console.log(doc.id, "=>", doc.data());
                    user = doc.data() as User;
                });
                return { valido: true, value: user as unknown as UserOnFirestore }
            }
        } catch (error) {
                if (error instanceof Error) {
                  const mensagemErro = error.message;
                  return { valido: false, erro: mensagemErro };
                } else {
                  return { valido: false, erro: "Erro desconhecido ao validar o texto" };
                }
              }
        }
      
        async login(
          email: string,
          password: string
        ): Promise<{ valido: boolean; value?: User; erro?: string }> {
          console.log(`Entrou no login. Dados: 
          email: ${email}
          password: ${password}`)
      
          try {
            const login = await this.findByEmail(email)
            if(login.valido === false){
              throw new Error(login.erro)
            }
            const user = login.value
            if(password === user?.password){
      
            console.log('Usuário encontrado:', user);
            return { valido: true, value: user as unknown as User};
            }
            throw new Error('A senha está incorreta')
          } catch (error: unknown) {
            if (error instanceof Error) {
              console.error('Erro durante o login:', error);
              const mensagemErro = error.message;
              return { valido: false, erro: mensagemErro };
            } else {
              console.error('Erro desconhecido durante o login:', error);
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
        user: UserOnAuth
      ): Promise<{ valido: boolean; value?: UserOnFirestore; erro?: string }> {
        const Newuser: UserOnFirestore = new UserOnFirestore({
          uid: user.uid,
          email: user.email,
          password: user.password
        })
        const NewUserData: FirebaseFirestore.DocumentData = Newuser
      try {
          const docRef = await this.db.collection(this.collectionPath).doc()
          const uid = docRef.id; // Obtém o ID gerado automaticamente do novo documento
          const data = { ...NewUserData, uid }
          const createdUser = await docRef.set(data);
          return { valido: true, value:data as UserOnFirestore , erro: undefined };
        } catch (error) {
          if (error instanceof Error) {
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
                console.log('Usuário deletado com sucesso');
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

    async update(uid: string, fieldToUpdate: string, newValue: any): Promise<{ valido: boolean; value?: string; erro?: string }>{
        try {
          const postRef = this.db.collection(this.collectionPath).doc(uid);

          const postSnapshot = await postRef.get();

          if (!postSnapshot.exists) {
              throw new Error('Documento não encontrado.')
          }
  
          const postData = postSnapshot.data();
          if (!postData || !postData.hasOwnProperty(fieldToUpdate)) {
              throw new Error(`O campo '${fieldToUpdate}' não existe no documento.`);
          }
  
          const previousValue = postData[fieldToUpdate];
          if (typeof previousValue !== typeof newValue) {
              throw new Error(`O tipo do valor anterior ${previousValue} não corresponde ao tipo do novo valor ${newValue}.`)
          }
  
          await postRef.update({
              [fieldToUpdate]: newValue
          });
  
            return { valido: true, value: 'Usuário atualizado com sucesso'}
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