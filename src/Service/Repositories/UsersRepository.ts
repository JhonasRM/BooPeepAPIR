import { DocumentData, Firestore, getFirestore } from "firebase-admin/firestore";
import { User } from "../Model/User";
import { conn } from "../../Data Access/DAO/conn";
import {  } from "firebase-auth";
import { Auth } from "firebase-admin/lib/auth/auth";
import { UserRecord } from "firebase-admin/lib/auth/user-record";
export class UsersRepository {
    private db: Firestore
    private collectionPath: string
    private auth: Auth
    
    constructor(){
        this.db = conn.firestore()
        this.auth = conn.auth()
        this.collectionPath = 'users'
        this.google  = 
    }
    async findByEmail(email: string): Promise<User | null> {
        const field = 'email';
        const value = email;

        try {
            const collectionRef = this.db.collection(this.collectionPath);
            const query = collectionRef.where(field, "==", value);
            const querySnapshot = await query.get();

            if (querySnapshot.empty) {
                console.log("No documents found");
                return null;
            } else {
                let user: User | null = null;

                querySnapshot.forEach((doc) => {
                    console.log(doc.id, "=>", doc.data());
                    user = doc.data() as User;
                });
                console.log(user)
                return user

            }
        } catch (error) {
            console.error(`Error finding user by email: ${error}`);
            return null;
        }
    }
    async getAllUsers(): Promise<User[] | null> {
        try {
            const collectionRef = this.db.collection(this.collectionPath);
            const querySnapshot = await collectionRef.get();
            const users: User[] = [];
            querySnapshot.forEach((doc) => {
                const userData = doc.data() as User;
                users.push(userData);
            });
            if (users[1] === null) {
                console.log('Nenhum Usuário encontrado')
                return null
            }
            return users;
        } catch (error) {
            console.error(`Error fetching users: ${error}`);
            return null;
        }
    }

    async loginEmail(email:string){
        this.auth.getUserByEmail(email)
        .then((UserRecord) =>{
            console.log(`Login realizado com sucesso. Dados do Usuário sendo enviados...`)
            return UserRecord.toJSON()
        })
        .catch((error) => )
    }
    async save(user: User): Promise<void> {
        const NewUser: FirebaseFirestore.DocumentData = {

            name: user.name,
            email: user.email,
            password: user.password,
            posts: [] // Adiciona um array vazio para armazenar as postagens do usuário
        }
        try {
            const docRef: FirebaseFirestore.DocumentReference = this.db.collection(this.collectionPath).doc(); // Criar uma referência para um novo documento com ID automático
            const uid = docRef.id; // Obtém o ID gerado automaticamente
            await docRef.set({ ...NewUser, uid });
            console.log('Usuário cadastrado com sucesso')
        } catch (error) {
            console.error(`Erro ao cadastrar o usuário: ${error}`);
        }
    }
    
    async delete(user: User): Promise<void> {
        try {
            const userQuerySnapshot = await this.db.collection(this.collectionPath)
                .where('email', '==', user.email)
                .get();

            if (userQuerySnapshot.empty) {
                console.log('Nenhum usuário encontrado com este e-mail.');
                throw new Error('Nenhum usuário encontrado');
            }
            userQuerySnapshot.forEach(async doc => {
                await doc.ref.delete();
                console.log('Usuário deletado com sucesso');
            });
        } catch (error) {
            console.error(`Erro ao deletar o usuário: ${error}`);
        }
    }

    async update(user: User): Promise<void> {
        try {
            const userQuerySnapshot = await this.db.collection(this.collectionPath)
                .where('email', '==', user.email)
                .get();
    
            if (userQuerySnapshot.empty) {
                console.log('Nenhum usuário encontrado com este e-mail.');
                throw new Error('Nenhum usuário encontrado com este e-mail.')
                return;
            }
    
            const UpdatedUser: any = await userQuerySnapshot.forEach(async doc => {
                await doc.ref.update({
                    name: user.name,
                    password: user.password
                    //outras propriedades ...
                });
                console.log('Usuário atualizado com sucesso');
                console.log(UpdatedUser)
                return UpdatedUser
            });
        } catch (error) {
            console.error(`Erro ao atualizar o usuário: ${error}`);
        }
    }
    
}
