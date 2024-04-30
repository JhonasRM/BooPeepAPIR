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
    constructor(){
        this.db = conn.firestore()
        this.auth = conn.auth()
        this.collectionPath = 'users'
        this.provider = new GoogleAuthProvider();
    }
    async findByEmail(email: string): Promise<void> {
        this.auth.getUserByEmail(email)
        .then((userRecord: UserRecord) => {
            const uid = userRecord.uid
            return uid
        })
        .catch((error) =>{
            return error
        })
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
    
    async save(user: User): Promise<void> {

            this.auth.createUser({
                email: user.email,
                emailVerified: false,
                password: user.password,
                displayName: user.name,
                photoURL: '',
                disabled: false,
            }).then((userRecord: UserRecord)=> {
                return userRecord.toJSON()
            })
            .catch((error) => {
                return error
            })
        
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
