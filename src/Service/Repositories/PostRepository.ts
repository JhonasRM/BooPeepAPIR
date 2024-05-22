import { DocumentData, Firestore, getFirestore } from "firebase-admin/firestore";
import { Post } from "../Model/Post";
import { AppAdmin } from "../../Data Access/DAO/AppAdmin/appAdmin";
export class PostRepository {
    private db: Firestore
    private collectionPath: string
    constructor() {
        this.db = AppAdmin.firestore()
        this.collectionPath = 'posts'
    }

    async findByID(id: string): Promise<{ valido: boolean; data?: Post; erro?: string }> {

        try {
            const docRef = this.db.collection("posts").doc(id);
            const docSnapshot = await docRef.get();

            if (!docSnapshot.exists) {
                throw new Error(`Postagem não encontrada`);
            }
            const FoundPost = docSnapshot.data() as Post
            const post = new Post({
                description: FoundPost.description,
                local: FoundPost.local,
                status: FoundPost.status
            }, FoundPost.UserID, FoundPost.postId, FoundPost.createdAt)
            return { valido: true, data: post }
        } catch (error) {
            if (error instanceof Error) {
                if (error.message === 'Postagem não encontrada') {
                    return { valido: false, erro: 'Postagem não encontrada' }
                } else {
                    return { valido: false, erro: error.message }
                }
            }
            return { valido: false, erro: `Internal Server Error: ${error}` }
        }
    }
    async getAllPosts(): Promise<{ valido: boolean; data?: Post[]; erro?: string }> {
        try {
            const collectionRef = this.db.collection(this.collectionPath);
            const querySnapshot = await collectionRef.get();
            const posts: Post[] = [];
            querySnapshot.forEach((doc) => {
                const postData = doc.data() as Post;
                const post: Post = new Post({
                    description: postData.description,
                    local: postData.local,
                    status: postData.status
                }, postData.UserID, postData.postId, postData.createdAt)
                posts.push(post);
            });
            if (posts[1] === null) {
                throw new Error('Nenhum post encontrado')
            }
            return { valido: true, data: posts }
        } catch (error) {
            if (error instanceof Error) {
                if (error.message === 'Nenhum post encontrado') {
                    return { valido: false, erro: 'Nenhum post encontrado' }
                } else {
                    return { valido: false, erro: error.message }
                }
            }
            return { valido: false, erro: `Internal Server Error: ${error}` }
        }
    }


    async save(post: Post): Promise<{ valido: boolean; data?: string; erro?: string }> {
        const NewPost: FirebaseFirestore.DocumentData = {
            description: post.description,
            createdAt: post.createdAt,
            local: post.local,
            status: post.status,
            UserID: post.UserID
        }
        try {
            const docRef = await this.db.collection(this.collectionPath).doc()
            const postId = docRef.id;
            await docRef.set({ ...NewPost, postId });
            const userRef = this.db.collection('users').doc(post.UserID);
            const userDoc = await userRef.get();
            if (userDoc.exists) {
                const userData = userDoc.data();
                if (userData && Array.isArray(userData.posts)) {
                    userData.posts.push(postId);
                    await userRef.update({ posts: userData.posts });
                    await userRef.update({ posts: [postId] });
                }
            } else {
                throw new Error(`Usuário com ID ${post.UserID} não encontrado.`);
            }
            return { valido: true, data: post.postId }
        } catch (error) {
            if (error instanceof Error) {
                if (error.message === 'Usuário não encontrado') {
                    return { valido: false, erro: 'Not Found' }
                } else {
                    return { valido: false, erro: error.message }
                }
            }
            return { valido: false, erro: 'Internal Server Error' }
        }

    }


    async updatePostField(postId: string, fieldToUpdate: string, newValue: any): Promise<{ valido: boolean; data?: string; erro?: string }> {
        try {
            const postRef = this.db.collection(this.collectionPath).doc(postId);

            const postSnapshot = await postRef.get();

            if (!postSnapshot.exists) {
                throw new Error('Postagem não encontrada.');

            }

            const postData = postSnapshot.data();
            if (!postData || !postData.hasOwnProperty(fieldToUpdate)) {
                throw new Error(`O campo '${fieldToUpdate}' não existe no documento.`);
            }

            const previousValue = postData[fieldToUpdate];
            if (typeof previousValue !== typeof newValue) {
                throw new Error(`O tipo do valor anterior não corresponde ao tipo do novo valor.`);
            }

            await postRef.update({
                [fieldToUpdate]: newValue
            });
            return { valido: true, data: 'Postagem atualizada com sucesso' }
        } catch (error) {
            if (error instanceof Error) {
                if (error.message === 'Postagem não encontrada.') {
                    return { valido: false, erro: 'Not Found' }
                } else if (error.message === `O campo '${fieldToUpdate}' não existe no documento.` || error.message === `O tipo do valor anterior não corresponde ao tipo do novo valor.`) {
                    return { valido: false, erro: 'Bad Request' }
                } else {
                    return { valido: false, erro: error.message }
                }
            }
            return { valido: false, erro: 'Internal Server Error' }
        }
    }
    async DeletePost(postId: string): Promise<{ valido: boolean; data?: string; erro?: string }> {
        try {
            const postRef = this.db.collection(this.collectionPath).doc(postId);

            const postSnapshot = await postRef.get();

            if (!postSnapshot.exists) {
                throw new Error('Postagem não encontrada');
            }

            await postRef.delete();
            return { valido: true, data: 'Postagem deletada com sucesso' }
        } catch (error) {
            if (error instanceof Error) {
                if (error.message === 'Postagem não encontrada') {
                    return { valido: false, erro: 'Postagem não encontrada' }
                } else {
                    return { valido: false, erro: error.message }
                }
            }
            return { valido: false, erro: 'Internal Server Error' }
        }
    }
}