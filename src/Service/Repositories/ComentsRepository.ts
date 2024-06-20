import { Post } from "../Model/Post";
import { AppAdmin } from "../../Data Access/DAO/AppAdmin/appAdmin";
import { IReturnAdapter } from "../../utils/Interfaces/IReturnAdapter";
import { Firestore } from "firebase-admin/firestore";
import { User } from "../Entities/User";
import { IComentRepository } from "../../utils/Interfaces/IComentRepository";
import { Coment } from "../Model/Coment";
import { text } from "express";
export class ComentRepository implements IComentRepository {
  db: Firestore;
  collectionPath: string;
  constructor() {
    this.db = AppAdmin.firestore();
    this.collectionPath = "posts";
  }

  async getComents(postID:string): Promise<IReturnAdapter> {
    try {
      const collectionRef = this.db.collection(this.collectionPath).doc(postID).collection('coments');
      const querySnapshot = await collectionRef.get();
      const coments: Coment[] = [];
      querySnapshot.forEach((doc) => {
        const comentsData = doc.data() as Coment;
        const coment: Coment = new Coment(
          comentsData.postID,
          comentsData.uid,
          comentsData.text,
          comentsData.createdAt,
          comentsData.comentID,
        );
        coments.push(coment);
      });
      if (coments[1] === null) {
        throw new Error("Nenhum comentário encontrada");
      }
      return { val: true, data: coments };
    } catch (error) {
      if (error instanceof Error) {
        return { val: false, erro: error.message };
      }
      return { val: false, erro: `Erro interno do servidor: ${error}` };
    }
  }

  async createPost(coment: Coment): Promise<IReturnAdapter> {
    const NewComent: FirebaseFirestore.DocumentData = {
      postID: coment.postID,
      uid: coment.uid,
      text: coment.text,
      createdAt: coment.createdAt
    }
    try {
      const docRef = await this.db.collection(this.collectionPath).doc(coment.postID).collection('coments').doc();
      const comentID = docRef.id;
      await docRef.set({ ...NewComent, comentID });
      return { val: true, data: coment.postID };
    } catch (error) {
      if (error instanceof Error) {
        return { val: false, erro: error.message };
      }
      return { val: false, erro: "Internal Server Error" };
    }
  }

  async updatePostField(
    postID: string,
    comentID: string,
    newValue: any
  ): Promise<IReturnAdapter> {
    try {
      const docRef = await this.db.collection(this.collectionPath).doc(postID).collection('coments').doc(comentID);
      const comentSnapshot = await docRef.get();

      if (!comentSnapshot.exists) {
        throw new Error("Comentário não encontrado.");
      }
      await docRef.update({
        text: newValue,
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
