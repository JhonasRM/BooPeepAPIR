import { ChatRepository } from "../../../../Service/Repositories/ChatRepository"
import { Message } from "../../../../Service/Model/Message"


export class ReadMessageUC {
    constructor(private chatRepository: ChatRepository){ }
    async execute(chatid: string): Promise<{valido: boolean, value?: Message[], erro?: string}>{
        try {
            const getMesssages = await this.chatRepository.readMessages(chatid)
            if (!getMesssages.valido ) {
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