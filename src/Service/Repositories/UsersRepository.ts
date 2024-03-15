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
    async VerifyWPassword(email: string, password: string): Promise<User | null | undefined> {
        const field = 'email';
        const value = email;
        const valuetoverify = password

        try {
            const collectionRef = this.db.collection("users");
            const query = collectionRef.where(field, "==", value);
            const querySnapshot = await query.get();

            if (querySnapshot.empty) {
                // console.log("Este email de usuário não existe");
                return null;
            } else {
                // console.log('Usuário Encontrado')
                let user: User | null = null;
                querySnapshot.forEach((doc) => {
                    const userData = doc.data() as User;
                    if (userData.password === valuetoverify) {
                        user = userData;
                        // console.log('Verificação de senha bem sucedida')
                        
                    } else {
                        // console.log("Senha Incorreta");
                    }
                    return user
                });
            }
        } catch (error) {
            console.error(`Erro ao buscar o usuário: ${error}`);
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
