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
            dateTime
        } = request.body;

       // const UserID = ''
        const MessageData: ICreateMessageRequestDTO = {
            chatID,
            UserID,
            // photoURL
            displayName,
            lastmsg,
            dateTime
        }
        try {
            await this.createMessageUC.execute(MessageData)

            return response.status(201).send();
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