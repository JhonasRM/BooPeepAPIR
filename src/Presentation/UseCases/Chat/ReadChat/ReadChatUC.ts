import { ChatRepository } from "../../../../Service/Repositories/ChatRepository"
import { IReadChatRequestDTO } from "./ReadChatDTO"

export class ReadPostUC {
    constructor(private ChatRepository: ChatRepository) { }
    async execute(data: IReadChatRequestDTO) {
       
        const wantedchat = await this.ChatRepository.readMessages(data.chatid)
        if (wantedchat === null) {
            throw new Error('Esta Chat não existe')
        } 
        return wantedchat
        
    }
}