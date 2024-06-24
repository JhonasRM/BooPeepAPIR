import { ChatRepository } from "../../../../Service/Repositories/ChatRepository"
import { Message } from "../../../../Service/Model/Message"
import { IReadMessageRequestDTO } from "./ReadMessageDTO"
import { IReturnAdapter } from "../../../../utils/Interfaces/IReturnAdapter"


export class ReadMessageUC {
    constructor(private chatRepository: ChatRepository){ }
    async execute(data: IReadMessageRequestDTO): Promise<IReturnAdapter>{
        try {
            const getMesssages = await this.chatRepository.readMessages(data.chatID)
            if (getMesssages.val === false) {
                throw new Error(getMesssages.erro)
            } 
            const Messages: Message[] = []
            getMesssages.data?.forEach((message: { chatID: string; UserID: string; displayName: string; lastmsg: string })=>{
                const newMessage = new Message(message.chatID, message.UserID, message.displayName, message.lastmsg)
                Messages.push(newMessage)
            })
            if(Messages.length === 0 || !Message){
                return {val: true, data: 'não há mensagens neste chat'}
            }
            return { val: true, data: Messages}   
        } catch (error) {
            if(error instanceof Error){
                return { val: false, erro: error.message}
            }
            return { val: false, erro: `Erro interno do servidor: ${error}`}
        }
    }
}