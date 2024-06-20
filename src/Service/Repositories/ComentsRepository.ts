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
      const comentSnapshot = await collectionRef.get();
      const coments: Coment[] = [];
      comentSnapshot.forEach((doc) => {
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

  async createComent(coment: Coment): Promise<IReturnAdapter> {
    const NewComent: FirebaseFirestore.DocumentData = {
      postID: coment.postID,
      uid: coment.uid,
      text: coment.text,
      createdAt: coment.createdAt
    }
    try {
      const comentRef = await this.db.collection(this.collectionPath).doc(coment.postID).collection('coments').doc();
      const comentID = comentRef.id;
      await comentRef.set({ ...NewComent, comentID });
      return { val: true, data: 'Comentário criado com sucesso.' };
    } catch (error) {
      if (error instanceof Error) {
        return { val: false, erro: error.message };
      }
      return { val: false, erro: "Internal Server Error" };
    }
  }

  async updateComent(
    postID: string,
    comentID: string,
    newValue: any
  ): Promise<IReturnAdapter> {
    try {
      const comentRef = await this.db.collection(this.collectionPath).doc(postID).collection('coments').doc(comentID);
      const comentSnapshot = await comentRef.get();

      if (!comentSnapshot.exists) {
        throw new Error("Comentário não encontrado.");
      }
      await comentRef.update({
        text: newValue,
      });
      return { val: true, data: "Comentário atualizado com sucesso" };
    } catch (error) {
      if (error instanceof Error) {
        return { val: false, erro: error.message };
      }

      return { val: false, erro: "Internal Server Error" };
    }
  }
  async deleteComent(postId: string, comentID: string): Promise<IReturnAdapter> {
    try {
      const comentRef = this.db.collection(this.collectionPath).doc(postId).collection('coments').doc(comentID);

      const comentSnapshot = await comentRef.get();

      if (!comentSnapshot.exists) {
        throw new Error("Comentário não encontrado");
      }

      await comentRef.delete();
      return { val: true, data: "Comentário deletado com sucesso" };
    } catch (error) {
      if (error instanceof Error) {
        if (error.message === "Comentário não encontrado") {
          return { val: false, erro: "Comentário não encontrado" };
        } else {
          return { val: false, erro: error.message };
        }
      }
      return { val: false, erro: "Internal Server Error" };
    }
  }
}
