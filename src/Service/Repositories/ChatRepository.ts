import { Database } from "firebase-admin/lib/database/database";
import { AppAdmin } from "../../Data Access/DAO/AppAdmin/appAdmin";
import { Chat } from "../Model/Chat";
import { Message } from "../Model/Message";
import { User, sendEmailVerification } from "@firebase/auth";
import { Firestore } from "firebase-admin/firestore";
import { IReturnAdapter } from "../../utils/Interfaces/IReturnAdapter";
export class ChatRepository {
  private realtimedb: Database;
  private path;

  constructor() {
    this.realtimedb = AppAdmin.database();
    this.path = this.realtimedb.ref("/chatest");
  }
  async setChat(
    newChat: Chat
  ): Promise<IReturnAdapter> {
    const chatRef = this.path.child(newChat.chatid);
    try {
      const setChat = await chatRef.set(newChat);
      return { val: true, data: newChat };
    } catch (error) {
      if (error instanceof Error) {
        const mensagemErro = error.message;
        return { val: false, erro: mensagemErro };
      } else {
        return { val: false, erro: "Erro desconhecido ao criar o chat" };
      }
    }
  }

  async sendMessage(
    message: Message
  ): Promise<IReturnAdapter> {
    try{
    const chatRef = this.path.child(`${message.chatID}/messages`);
    const snapshot = await chatRef.once("value");
    const data = snapshot.val();
    console.log('Entrou no chat')
    if (data) {
        console.log('chat encontrado')
        const messages: Message[] = data  
        messages.push(message)       
        await chatRef.set(messages) 
    return { val: true, data: "Mensagem enviada com sucesso" };
        }
      throw new Error('erro ao encontrar os dados do chat')
    }catch (error) {
    if (error instanceof Error) {
      const mensagemErro = error.message;
      return { val: false, erro: mensagemErro };
    } else {
      return { val: false, erro: `Erro desconhecido ao ler as mensagens: ${error}` };
    }
  }
}
  async readMessages(
    chatid: string
  ): Promise<IReturnAdapter> {
      try {
        const chatRef = this.path.child(`${chatid}/messages/`);
        const messages: Message[] = [];
        const snapshot = await chatRef.once('value');
        const data = snapshot.val();
    
        if (data) {
          Object.values(data).forEach((item) => {
            // Verifica se o item é um objeto Message
            if (
              typeof item === 'object' &&
              item !== null &&
              'chatID' in item &&
              'UserID' in item &&
              'displayName' in item &&
              'lastmsg' in item &&
              'dateTime' in item
            ) {
              messages.push(item as Message);
            }
          });
        }
    
        return { val: true, data: messages };
      } catch (error) {
        if (error instanceof Error) {
          const mensagemErro = error.message;
          return { val: false, erro: mensagemErro };
        } else {
          return { val: false, erro: 'Erro desconhecido ao ler as mensagens' };
        }
      }
    }
      }

