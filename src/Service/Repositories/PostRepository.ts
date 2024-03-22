import { DocumentData, Firestore, getFirestore } from "firebase-admin/firestore";
import { User } from "../Model/User";
import { conn } from "../../Data Access/DAO/conn";
import { Post } from "../Model/Post";

export class PostRepository {
    private db: Firestore
    private collectionPath: string
    constructor() {
        conn()
        this.db = getFirestore()
        this.collectionPath = 'posts'
    }
    async findUser(id: string): Promise<User | null> {
        const field = 'id';
        const value = id;

        try {
            const collectionRef = this.db.collection('users');
            const query = collectionRef.where(field, "==", value);
            const querySnapshot = await query.get();

            if (querySnapshot.empty) {
                console.log("No documents found");
                return null;
            } else {
                let user: User | null = null;

                querySnapshot.forEach(async (doc) => {
                    console.log(doc.id, "=>", doc.data());
                    user = await doc.data() as User;
                });

                return user;
            }
        } catch (error) {
            console.error(`Error finding user by email: ${error}`);
            return null;
        }
    }
    async findByID(id: string): Promise<Post | null> {
        const field = 'id';
        const value = id;

        try {
            const collectionRef = this.db.collection(this.collectionPath);
            const query = collectionRef.where(field, "==", value);
            const querySnapshot = await query.get();

            if (querySnapshot.empty) {
                console.log("No documents found");
                return null;
            } else {
                let post: Post | null = null;

                querySnapshot.forEach(async (doc) => {
                    console.log(doc.id, "=>", doc.data());
                    post = await doc.data() as Post;
                });

                return post;
            }
        } catch (error) {
            console.error(`Error finding post by userID: ${error}`);
            return null;
        }
    }
    async getAllPosts(): Promise<Post[] | null> {
        try {
            const collectionRef = this.db.collection(this.collectionPath);
            const querySnapshot = await collectionRef.get();
            const posts: Post[] = [];
            querySnapshot.forEach((doc) => {
                const postData = doc.data() as Post;
                posts.push(postData);
            });
            if (posts[1] === null) {
                console.log('Nenhum post encontrado')
                return null
            }
            return posts;
        } catch (error) {
            console.error(`Error fetching users: ${error}`);
            return null;
        }
    }


    async save(post: Post): Promise<void> {
        try {
            const docRef: DocumentData = await this.db.collection(this.collectionPath).add(post);
            console.log('Usuário cadastrado com sucesso');
            console.log(post)
        } catch (error) {
            console.error(`Erro ao cadastrar o usuário: ${error}`);
        }
    }
    

    async updatePostField(postId: string, fieldToUpdate: string, newValue: any): Promise<void | string > {
        try {
            const postRef = this.db.collection(this.collectionPath).doc(postId);

            const postSnapshot = await postRef.get();

            if (!postSnapshot.exists) {
                console.error('Documento não encontrado.');
                return 'Documento não encontrado';
            }
    
            const postData = postSnapshot.data();
            if (!postData || !postData.hasOwnProperty(fieldToUpdate)) {
                console.error(`O campo '${fieldToUpdate}' não existe no documento.`);
                return 'O campo requerido não existe no documento';
            }
    
            const previousValue = postData[fieldToUpdate];
            if (typeof previousValue !== typeof newValue) {
                console.error(`O tipo do valor anterior '${previousValue}' não corresponde ao tipo do novo valor '${newValue}'.`);
                return 'O tipo do valor anterior do campo requerido não corresponde ao tipo do novo valor ';
            }
    
            await postRef.update({
                [fieldToUpdate]: newValue
            });
    
            console.log('Campo atualizado com sucesso.');
            return 'Campo atualizado com sucesso';
        } catch (error) {
            console.error('Erro ao atualizar campo:', error);
        }
    }

}
