import { Post } from "../Model/Post";
import { AppAdmin } from "../../Data Access/DAO/AppAdmin/appAdmin";
import { IPostRepository } from "../../utils/Interfaces/IPostRepository";
import { IReturnAdapter } from "../../utils/Interfaces/IReturnAdapter";
import { Firestore } from "firebase-admin/firestore";
export class PostRepository implements IPostRepository {
  db: Firestore;
  collectionPath: string;
  constructor() {
    this.db = AppAdmin.firestore();
    this.collectionPath = "posts";
  }

  async getPost(id: string): Promise<IReturnAdapter> {
    try {
      const docRef = this.db.collection("posts").doc(id);
      const docSnapshot = await docRef.get();

      if (!docSnapshot.exists) {
        throw new Error(`Postagem não encontrada`);
      }
      const FoundPost = docSnapshot.data() as Post;
      const post = new Post(
        {
          description: FoundPost.description,
          local: FoundPost.local,
          status: FoundPost.status,
        },
        FoundPost.UserID,
        FoundPost.postId,
        FoundPost.createdAt
      );
      return { val: true, data: post };
    } catch (error) {
      if (error instanceof Error) {
        return { val: false, erro: error.message };
      }
      return { val: false, erro: `Internal Server Error: ${error}` };
    }
  }
  async getPosts(): Promise<IReturnAdapter> {
    try {
      const collectionRef = this.db.collection(this.collectionPath);
      const querySnapshot = await collectionRef.get();
      const posts: Post[] = [];
      querySnapshot.forEach((doc) => {
        const postData = doc.data() as Post;
        const post: Post = new Post(
          {
            description: postData.description,
            local: postData.local,
            status: postData.status,
          },
          postData.UserID,
          postData.postId,
          postData.createdAt
        );
        posts.push(post);
      });
      if (posts[1] === null) {
        throw new Error("Nenhuma postagem encontrada");
      }
      return { val: true, data: posts };
    } catch (error) {
      if (error instanceof Error) {
        return { val: false, erro: error.message };
      }
      return { val: false, erro: `Internal Server Error: ${error}` };
    }
  }

  async createPost(post: Post): Promise<IReturnAdapter> {
    const NewPost: FirebaseFirestore.DocumentData = {
      description: post.description,
      createdAt: post.createdAt,
      local: post.local,
      status: post.status,
      UserID: post.UserID,
    };
    try {
      const docRef = await this.db.collection(this.collectionPath).doc();
      const postId = docRef.id;
      await docRef.set({ ...NewPost, postId });
      const userRef = this.db.collection("users").doc(post.UserID);
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
      return { val: true, data: post.postId };
    } catch (error) {
      if (error instanceof Error) {
        return { val: false, erro: error.message };
      }
      return { val: false, erro: "Internal Server Error" };
    }
  }

  async updatePostField(
    postId: string,
    fieldToUpdate: string,
    newValue: any
  ): Promise<IReturnAdapter> {
    try {
      const postRef = this.db.collection(this.collectionPath).doc(postId);

      const postSnapshot = await postRef.get();

      if (!postSnapshot.exists) {
        throw new Error("Postagem não encontrada.");
      }

      const postData = postSnapshot.data();
      if (!postData || !postData.hasOwnProperty(fieldToUpdate)) {
        throw new Error(`O campo '${fieldToUpdate}' não existe no documento.`);
      }

      const previousValue = postData[fieldToUpdate];
      if (typeof previousValue !== typeof newValue) {
        throw new Error(
          `O tipo do valor anterior não corresponde ao tipo do novo valor.`
        );
      }

      await postRef.update({
        [fieldToUpdate]: newValue,
      });
      return { val: true, data: "Postagem atualizada com sucesso" };
    } catch (error) {
      if (error instanceof Error) {
        return { val: false, erro: error.message };
      }

      return { val: false, erro: "Internal Server Error" };
    }
  }
  async deletePost(postId: string): Promise<IReturnAdapter> {
    try {
      const postRef = this.db.collection(this.collectionPath).doc(postId);

      const postSnapshot = await postRef.get();

      if (!postSnapshot.exists) {
        throw new Error("Postagem não encontrada");
      }

      await postRef.delete();
      return { val: true, data: "Postagem deletada com sucesso" };
    } catch (error) {
      if (error instanceof Error) {
        if (error.message === "Postagem não encontrada") {
          return { val: false, erro: "Postagem não encontrada" };
        } else {
          return { val: false, erro: error.message };
        }
      }
      return { val: false, erro: "Internal Server Error" };
    }
  }
}
