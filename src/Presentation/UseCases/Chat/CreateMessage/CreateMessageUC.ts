import { Message } from "../../../../Service/Model/Message";
import { UsersAuthRepository } from "../../../../Service/Repositories/UsersAuthRepository";
import { UsersFireStoreRepository } from "../../../../Service/Repositories/UsersFireStoreRepository";
import { ChatRepository } from "../../../../Service/Repositories/ChatRepository";
import { ICreateMessageRequestDTO } from "./CreateMessageDTO";

export class CreateMessageUC {
    constructor(private chatRepository: ChatRepository, private usersFireStoreRepository: UsersFireStoreRepository, private usersAuthRepository: UsersAuthRepository
    ) { }

    async execute(data: ICreateMessageRequestDTO, email: string): Promise<{valido: boolean, value?: Message[], erro?: string}> {
        try {
            const userAuth = await this.usersAuthRepository.findByEmail(email);
            if (userAuth.valido === false) {
                throw new Error('Usuário não encontrado');
            }

            const uid = userAuth.value?.uid as string;
            if (uid !== data.UserID) {
                throw new Error('ID do usuário não corresponde ao autenticado');
            }

            const newMessage: Message = new Message(data.chatID, data.lastmsg);
            const sendMessageResult = await this.chatRepository.sendMessage(newMessage);

            if (sendMessageResult.valido === false) {
                throw new Error(sendMessageResult.erro);
            }

            return { valido: true, value: sendMessageResult};
        } catch (error) {
            if (error instanceof Error) {
                return { valido: false, erro: error.message };
            }
            return { valido: false, erro: `Erro interno do servidor: ${error}` };
        }
    }
}
