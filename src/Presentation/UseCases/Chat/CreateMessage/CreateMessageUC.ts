import { Message } from "../../../../Service/Model/Message";
import { ChatRepository } from "../../../../Service/Repositories/ChatRepository";
import { UserFireStoreRepository } from "../../../../Service/Repositories/UserFireStoreRepository";
import { IReturnAdapter } from "../../../../utils/Interfaces/IReturnAdapter";
import { ICreateMessageRequestDTO } from "./CreateMessageDTO";

export class CreateMessageUC {
    constructor(
        private chatRepository: ChatRepository, 
        private usersFireStoreRepository: UserFireStoreRepository
    ) { }

    async execute(data: ICreateMessageRequestDTO): Promise<IReturnAdapter> {
        try {
            const user = await this.usersFireStoreRepository.getUser(data.uid)
            if (user.val === false) {
                throw new Error('O Usuário não foi encontrado')
            } 
            const newMessage: Message = new Message(
                data.chatID,
                data.uid,
                data.displayName,
                data.lastmsg
            );

            console.log('Enviando Nova Mensagem...');
            const sendMessage = await this.chatRepository.sendMessage(newMessage);
            if (sendMessage.val === false) {
                throw new Error(sendMessage.erro);
            }
            return {
                val: true, data: sendMessage.data
            };
        } catch (error) {
            if (error instanceof Error) {
                if (error.message === "O Chat não foi encontrado") {
                    return { val: false, erro: "O Chat não foi encontrado" };
                } else {
                    return { val: false,  erro: `Erro ao enviar a mensagem: ${error.message}` };
                }
            }
            return { val: false,erro: `Erro interno do servidor: ${error}` };
        }
    }
}
