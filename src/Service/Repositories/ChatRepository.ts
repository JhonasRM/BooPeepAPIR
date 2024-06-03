import { Database } from "firebase-admin/lib/database/database";
import { AppAdmin } from "../../Data Access/DAO/AppAdmin/appAdmin";
import { Chat } from "../Model/Chat";
import { Message } from "../Model/Message";
import { User, sendEmailVerification } from "@firebase/auth";
export class ChatRepository {
  private realtimedb: Database;
  private path;
  constructor() {
    this.realtimedb = AppAdmin.database();
    this.path = this.realtimedb.ref("/chatest");
  }
  async setChat(
    newChat: Chat
  ): Promise<{ valido: boolean; value?: Chat; erro?: string }> {
    const chatRef = this.path.child(newChat.chatid);
    try {
      const setChat = await chatRef.set(newChat);
      return { valido: true, value: newChat };
    } catch (error) {
      if (error instanceof Error) {
        const mensagemErro = error.message;
        return { valido: false, erro: mensagemErro };
      } else {
        return { valido: false, erro: "Erro desconhecido ao criar o chat" };
      }
    }
  }

  async sendMessage(
    message: Message
  ): Promise<{ valido: boolean; erro?: string; value?: string }> {
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
    return { valido: true, value: "Mensagem enviada com sucesso" };
        }
      throw new Error('erro ao encontrar os dados do chat')
    }catch (error) {
    if (error instanceof Error) {
      const mensagemErro = error.message;
      return { valido: false, erro: mensagemErro };
    } else {
      return { valido: false, erro: `Erro desconhecido ao ler as mensagens: ${error}` };
    }
  }
}
  async readMessages(
    chatid: string
  ): Promise<{ valido: boolean; value?: Message[]; erro?: string }> {
    try {
      const chatRef = this.path.child(`${chatid}/messages/`);
      const messages: Message[] = [];
      const snapshot = await chatRef.once("value");
      const data = snapshot.val();

      if (data) {
        Object.values(data).forEach((value) => {
          if (Array.isArray(value)) {
            value.forEach((item) => {
              if (
                typeof item === "object" &&
                item !== null &&
                "id" in item &&
                "text" in item &&
                "timestamp" in item
              ) {
                messages.push(item as Message);
              }
            });
          }
        });
      }

      return { valido: true, value: messages };
    } catch (error) {
      if (error instanceof Error) {
        const mensagemErro = error.message;
        return { valido: false, erro: mensagemErro };
      } else {
        return { valido: false, erro: "Erro desconhecido ao ler as mensagens" };
      }
    }
  }
}
