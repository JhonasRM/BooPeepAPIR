import { Message } from "../../../../Service/Model/Message";
import { ChatRepository } from "../../../../Service/Repositories/ChatRepository";
import { UserFireStoreRepository } from "../../../../Service/Repositories/UserFireStoreRepository";
import { ICreateMessageRequestDTO } from "./CreateMessageDTO";

export class CreateMessageUC {
    constructor(
        private chatRepository: ChatRepository, 
        private usersFireStoreRepository: UserFireStoreRepository
    ) { }

    async execute(data: ICreateMessageRequestDTO): Promise<{ valido: boolean, value?: number, erro?: string, data?: string }> {
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
            if (sendMessage.valido === false) {
                throw new Error(sendMessage.erro);
            }
            return {
                valido: true, value: 201, data: sendMessage.value
            };
        } catch (error) {
            if (error instanceof Error) {
                if (error.message === "O Chat não foi encontrado") {
                    return { valido: false, value: 404, erro: "O Chat não foi encontrado" };
                } else {
                    return { valido: false, value: 400, erro: `Erro ao enviar a mensagem: ${error.message}` };
                }
            }
            return { valido: false, value: 500, erro: `Erro interno do servidor: ${error}` };
        }
    }
}
