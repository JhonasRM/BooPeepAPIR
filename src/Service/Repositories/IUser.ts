import { DocumentData, getFirestore } from "firebase-admin/firestore";
import { User } from "../Model/User";

export class IUsersRepository {
    db = getFirestore()
    async findByEmail(email: string) {
        const field = 'email'
        const value = email

        // Get a reference to the collection where you want to find the document
        const collectionRef = this.db.collection("user");
        const query = collectionRef.where(field, "==", value);
        const querySnapshot = await query.get();
        if (querySnapshot.empty) {
            console.log("No documents found");
        } else {
            // Iterate through the documents and print their data
            querySnapshot.forEach((doc: DocumentData) => {
                console.log(doc.id, "=>", doc.data())
                const user: User = doc.data()
                return user
            })

        }
    }
    async save(user: User): Promise<void> {
        try {
            const collectionPath: string = 'users'
            const collectionRef = await this.db.collection(collectionPath).add(user);
            const docRef = await collectionRef.add({
                name: user.name,
                email: user.email,
                password: user.password
            });
            console.log('Usuário cadastrado com sucesso')
        }
        catch (error) {
            console.log(`Erro ao cadastrar o usuário: ${error}`);
        }
    }
    async delete(user: User): Promise<void> {
        try {
            const collectionPath: string = 'users';
            const querySnapshot = await this.db.collection(collectionPath).where('email', '==', user.email).get();

            if (querySnapshot.empty) {
                console.log('Nenhum usuário encontrado com o e-mail fornecido:', user.email);
                return;
            }

            querySnapshot.forEach(async (doc) => {
                await doc.ref.delete();
                console.log('Usuário excluído com sucesso');
            });
        } catch (error) {
            console.error(`Erro ao excluir o usuário: ${error}`);
        }
    }

}