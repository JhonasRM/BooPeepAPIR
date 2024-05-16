import { DocumentData, Firestore, getFirestore } from "firebase-admin/firestore";
import { conn } from "../../Data Access/DAO/AppAdmin/conn";
import { Post } from "../Model/Post";
export class PostRepository {
    private db: Firestore
    private collectionPath: string
    constructor() {
        this.db = conn.firestore()
        this.collectionPath = 'posts'
    }
    
    async findByID(id: string): Promise<Post | null> {

        try {
            const docRef = this.db.collection("posts").doc(id);
        const docSnapshot = await docRef.get();

        if (!docSnapshot.exists) {
            console.log(`Nenhum post foi encontrado o ID: ${id}`);
            return null;
        } else {
            console.log("Post encontrado:");
            console.log(docSnapshot.id, "=>", docSnapshot.data());
            return docSnapshot.data() as Post;
        }
            
        } catch (error: any) {
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


    async save(post: Post): Promise<void | any> {
        const NewPost: FirebaseFirestore.DocumentData = {
            description: post.description,
            createdAt: post.createdAt,
            local: post.local,
            status: post.status,
            UserID: post.UserID
        }
        try {
            const docRef = await this.db.collection(this.collectionPath).doc()
            const postId = docRef.id; // Obtém o ID gerado automaticamente do novo documento
            await docRef.set({ ...NewPost, postId });
            // Adiciona o ID da postagem ao array de postagens do usuário
            const userRef = this.db.collection('users').doc(post.UserID);
            const userDoc = await userRef.get(); // Obtém o documento do usuário
            if (userDoc.exists) {
                const userData = userDoc.data();
                if (userData && Array.isArray(userData.posts)) {
                    userData.posts.push(postId); // Adiciona o ID da nova postagem ao array de postagens do usuário
                    await userRef.update({ posts: userData.posts }); // Atualiza o documento do usuário com o novo array de postagens
                } else {
                    // Se o campo de postagens não existir ou não for um array, inicializa o array com o ID da nova postagem
                    await userRef.update({ posts: [postId] });
                }
            } else {
                throw new Error(`Usuário com ID ${post.UserID} não encontrado.`);
            }
        
            console.log('Postagem criada com sucesso');
            console.log(post);
        } catch (error) {
            console.error(`Erro ao criar a postagem: ${error}`);
            return error
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
                return 'O tipo do valor anterior do campo requerido não corresponde ao tipo do novo valor';
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
    async DeletePost(postId: string): Promise<void | string> {
        try {
            const postRef = this.db.collection(this.collectionPath).doc(postId);

            const postSnapshot = await postRef.get();

            if (!postSnapshot.exists) {
                console.error('Documento não encontrado.');
                throw new Error('Post Não Encontrado');
            }
            
            await postRef.delete();
            return
        } catch (error) {
            if (error instanceof Error) {
                console.error('Erro ao deletar documento:', error);
                return 'Erro ao deletar documento: ' + error.message; // Retorna uma mensagem de erro
            } else {
                console.error('Erro ao deletar documento:', error);
                return 'Erro ao deletar documento: ' + String(error); // Retorna uma mensagem de erro
            }
    }
    }
}