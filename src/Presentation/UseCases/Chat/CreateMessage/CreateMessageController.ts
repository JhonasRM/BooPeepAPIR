import { Request, Response } from 'express';
import { CreateMessageUC } from './CreateMessageUC';
import { ICreateMessageRequestDTO } from './CreateMessageDTO';

export class CreateMessageController {
    constructor(
        private createMessageUC: CreateMessageUC,
    ) { }

    async handle(request: Request, response: Response): Promise<Response> {
        const {
            chatID,
            UserID,
            // photoURL
            displayName,
            lastmsg,
        } = request.body;

       // const UserID = ''
        const MessageData: ICreateMessageRequestDTO = {
            chatID: chatID,
            uid:  UserID,
            // photoURL
            displayName: displayName,
            lastmsg: lastmsg,
        }
        try {
            const newMessage = await this.createMessageUC.execute(MessageData)
            if(newMessage.valido === false){
                throw new Error(newMessage.erro)
            }
            return response.status(201).send(newMessage.data);
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.error(`Erro: ${error.message}`);
                return response.status(400).send('Erro: ' + error.message);
            } else {
                console.error(`Erro desconhecido: ${error}`);
                return response.status(500).send('Erro desconhecido');
            }
        }
    }
}