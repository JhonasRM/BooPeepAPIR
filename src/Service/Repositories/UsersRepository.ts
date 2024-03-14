import { DocumentData, Firestore, getFirestore } from "firebase-admin/firestore";
import { User } from "../Model/User";
import { conn } from "../../Data Access/DAO/conn";

export class UsersRepository {
    private db: Firestore
    constructor(){
        conn()
        this.db = getFirestore()
    }
    async findByEmail(email: string): Promise<User | null> {
        const field = 'email';
        const value = email;

        try {
            const collectionRef = this.db.collection("users");
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

                return user;
            }
        } catch (error) {
            console.error(`Error finding user by email: ${error}`);
            return null;
        }
    }
    async findByName(name: string): Promise<User | null> {
        const field = 'name';
        const value = name;

        try {
            const collectionRef = this.db.collection("users");
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

                return user;
            }
        } catch (error) {
            console.error(`Error finding user by email: ${error}`);
            return null;
        }
    }
    async save(user: User): Promise<void> {
        try {
            const collectionPath: string = 'users';
            const docRef: DocumentData = await this.db.collection(collectionPath).add(user);
            console.log('Usuário cadastrado com sucesso');
            console.log(user)
        } catch (error) {
            console.error(`Erro ao cadastrar o usuário: ${error}`);
        }
    }
}
