import { Request, Response } from 'express';
import { CreateMessageUC } from './CreateMessageUC';
import { ICreateMessageRequestDTO } from './CreateMessageDTO';

export class CreateMessageController {
    constructor(
        private createMessageUC: CreateMessageUC,
    ) { }

    async handle(request: Request, response: Response): Promise<void> {
        const {
            chatID,
            uid,
            // photoURL
            displayName,
            lastmsg,
        } = request.body;

       // const UserID = ''
        const MessageData: ICreateMessageRequestDTO = {
            chatID: chatID,
            uid:  uid,
            // photoURL
            displayName: displayName,
            lastmsg: lastmsg,
        }
        try {
            const newMessage = await this.createMessageUC.execute(MessageData)
            if(newMessage.val === false){
                throw new Error(newMessage.erro)
            }
             response.status(201).send(newMessage.data);
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.error(`Erro: ${error.message}`);
                response.status(400).send('Erro: ' + error.message);
            } else {
                console.error(`Erro desconhecido: ${error}`);
                response.status(500).send('Erro desconhecido');
            }
        }
    }
}