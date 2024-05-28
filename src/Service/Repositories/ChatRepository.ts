import { Database } from "firebase-admin/lib/database/database";
import { AppAdmin } from "../../Data Access/DAO/AppAdmin/appAdmin";
import { Chat } from "../Model/Chat";
import { Message } from "../Model/Message";
import { User, sendEmailVerification } from "@firebase/auth";
export class ChatRepository {
    private realtimedb: Database;
    private path;
    constructor() {
        this.realtimedb = AppAdmin.database()
        this.path = this.realtimedb.ref('chatest')
    }
    async setChat(
        newChat: Chat
    ): Promise<{ valido: boolean; value?: Chat; erro?: string }> {
        const chatRef = this.path.child(newChat.chatid)
        try{
        chatRef.set(newChat)
        return {valido: true, value: newChat};
    }catch(error){
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
    ): Promise<{ valido: boolean; erro?: string, value?: Message}> {
        const chatRef = this.path.child(`${message.chatID}/messages/`)
        const ref = chatRef.child(`${message.UserID}-${message.dateTime}`)
        try{
        ref.push(message)
        return { valido: true, value: message};
        }catch(error){
            if (error instanceof Error) {
                const mensagemErro = error.message;
                return { valido: false, erro: mensagemErro};
            } else {
                return { valido: false, erro: "Erro desconhecido ao enviar a mensagem"};
            }
        }
    }

    async readMessages(
        chatid:string
    ): Promise <{ valido: boolean; value?: Message[]; erro?: string }>{
        try{
        const chatRef = this.path.child(`${chatid}/messages/`)
      const messages: Message[] = [];
        await chatRef.on('value', (snapshot) => {
            const data = snapshot.val();
            if (data) {
                Object.values(data).forEach((msg: unknown) => {
                    if (typeof msg === 'object' && msg !== null) {
                        messages.push(msg as Message);
                    }
                });
            }
        },
         (errorObject) => {
            throw new Error('A leitura falhou:  ');
        });
        return { valido: true, value: messages };
    }catch(error){
        if (error instanceof Error) {
            const mensagemErro = error.message;
            return { valido: false, erro: mensagemErro };
        } else {
            return { valido: false, erro: "Erro desconhecido ao ler as mensagens" };
        }
    }
    }
}