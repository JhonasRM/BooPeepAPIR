import { Database } from "firebase-admin/lib/database/database";
import { AppAdmin } from "../../Data Access/DAO/AppAdmin/appAdmin";
import { randomUUID } from "crypto";
import { Chat } from "../Model/Chat";
import { Message } from "../Model/Message";
import { User } from "../Model/User";
import { ReadUserUC } from "../../Presentation/UseCases/Users/ReadUser/ReadUserUC";
import { UsersAuthRepository } from "./UsersAuthRepository";
import { UsersFireStoreRepository } from "./UsersFireStoreRepository";

export class ChatRepository {
    private realtimedb: Database;
    private path;
    constructor() {
        this.realtimedb = AppAdmin.database()
        this.path = this.realtimedb.ref('chat/')
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
        try{
        chatRef.set(message)
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
        const chatRef = this.path.child(`${chatid}/messages`)
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
        }, (errorObject) => {
            throw new Error('A leitura falhou: ' + errorObject.name);
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

// async function tantofaz() {
//     const chatrep: ChatRepository = new ChatRepository();
//     const usersA: UsersAuthRepository = new UsersAuthRepository();
//     const usersF: UsersFireStoreRepository = new UsersFireStoreRepository();
//     const readUserUC: ReadUserUC = new ReadUserUC(usersA, usersF);
    
//     const readUser = await readUserUC.execute({
//         email: 'dias44520@gmail.com',
//         password: '123asd789'
//     });
    
//     if (readUser.valido === false) {
//         console.log('deu ruim');
//         return;
//     }
    
//     console.log('deu bom');
//     const user = readUser.data as User;
//     const chatResponse = await chatrep.setChat(chat);
    
//     if (!chatResponse.valido) {
//         console.log(chatResponse.erro);
//         return;
//     }
    
//     const chat = chatResponse.value as Chat;
//     const newMessage = new Message(chat.chatid, 'oi', user);
    
//     const sendMessageResponse = await chatrep.sendMessage(newMessage, user);
    
//     if (!sendMessageResponse.valido) {
//         console.log(sendMessageResponse.erro);
//         return;
//     }
    
//     const readMessagesResponse = await chatrep.readMessages(chat);
    
//     if (!readMessagesResponse.valido) {
//         console.log(readMessagesResponse.erro);
//         return;
//     }
    
//     const messages = readMessagesResponse.value as Message[];
//     console.log('Mensagens:', messages);
// }

// tantofaz();
