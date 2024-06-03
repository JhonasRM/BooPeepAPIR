import { ChatRepository } from "../../../../Service/Repositories/ChatRepository"
import { Message } from "../../../../Service/Model/Message"
import { IReadMessageRequestDTO } from "./ReadMessageDTO"


export class ReadMessageUC {
    constructor(private chatRepository: ChatRepository){ }
    async execute(data: IReadMessageRequestDTO): Promise<{valido: boolean, value?: Message[], erro?: string}>{
        try {
            const getMesssages = await this.chatRepository.readMessages(data.chatID)
            if (getMesssages.valido === false) {
                throw new Error(getMesssages.erro)
            } 
            const Messages: Message[] = []
            getMesssages.value?.forEach((message)=>{
                const newMessage = new Message(message.chatID, message.UserID, message.displayName, message.lastmsg)
                Messages.push(newMessage)
            })
            if(Messages.length === 0 || !Message){
                throw new Error('Este chat não existe')
            }
            return { valido: true, value: Messages}   
        } catch (error) {
            if(error instanceof Error){
                return { valido: false, erro: error.message}
            }
            return { valido: false, erro: `Erro interno do servidor: ${error}`}
        }
    }
}