import { DocumentData, Firestore, getFirestore } from "firebase-admin/firestore";
import { User } from "../Model/User";
import { conn } from "../../Data Access/DAO/conn";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
import { Auth } from "firebase-admin/lib/auth/auth";
import { UserRecord } from "firebase-admin/lib/auth/user-record";
export class UsersRepository {
    private db: Firestore
    private collectionPath: string
    private auth: Auth
    private provider: GoogleAuthProvider
    constructor() {
        this.db = conn.firestore()
        this.auth = conn.auth()
        this.collectionPath = 'users'
        this.provider = new GoogleAuthProvider();
    }
    async findByEmail(email: string): Promise<object | unknown> {
        try {
            const userRecord = await this.auth.getUserByEmail(email)
            const user = userRecord.toJSON()
            return user
        } catch (error) {
            return error
        }
    }
    async getAllUsers(): Promise<void> {
        this.auth.listUsers()
        .then((listUsersResult) => {
            listUsersResult.users.forEach((userRecord: UserRecord) =>{
                console.log('user', userRecord.toJSON())
            });
        })
        .catch((error) => {
            return error
        })
    }

    async save(user: User): Promise<object | unknown> {
        try{
        const userRecord = await this.auth.createUser({
            email: user.email,
            emailVerified: false,
            password: user.password,
            displayName: user.name,
            disabled: false,
        })
            console.log(userRecord.toJSON())
            return userRecord.toJSON()
    }catch(error){
        console.log(error)
        return error
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
