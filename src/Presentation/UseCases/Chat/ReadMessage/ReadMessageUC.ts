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
            return { valido: true, value: getMesssages.value}   
        } catch (error) {
            if(error instanceof Error){
                return { valido: false, erro: error.message}
            }
            return { valido: false, erro: `Erro interno do servidor: ${error}`}
        }
    }
}