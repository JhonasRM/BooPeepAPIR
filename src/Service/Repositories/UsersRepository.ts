import { DocumentData, Firestore, getFirestore } from "firebase-admin/firestore";
import { User } from "../Model/User";
import { conn } from "../../Data Access/DAO/conn";
import * as admin from 'firebase-admin';
export class UsersRepository {
    private db: Firestore
    private collectionPath: string
    constructor(){
        this.db = conn.firestore()
        this.collectionPath = 'users'
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
            // console.error(`Error finding user by email: ${error}`);
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

    async save(user: User): Promise<User | Error> {
        console.log('Entrou em save do UsersRepository')
        const NewUser: FirebaseFirestore.DocumentData = {
            name: user.name,
            email: user.email,
            password: user.password,
            posts: []
        }
        try {
            const docRef: FirebaseFirestore.DocumentReference = this.db.collection(this.collectionPath).doc();
            const uid = docRef.id;
            await docRef.set({ ...NewUser, uid });
            console.log('Usuário cadastrado com sucesso')
            return user
        } catch (error) {
            console.error(`Erro ao cadastrar o usuário: ${error}`);
            return error as Error
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
