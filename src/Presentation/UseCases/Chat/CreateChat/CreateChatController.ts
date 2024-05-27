import { Request, Response } from 'express';
import { CreateChatUC } from './CreateChatUC';
import { ICreateChatRequestDTO } from './CreateChatDTO';

export class CreateChatController {
    constructor(
        private createChatUC: CreateChatUC,
    ) { }

    async handle(request: Request, response: Response): Promise<Response> {
        const {
  
           uid         
        } = request.body;

        const UserID = ''
        const ChatData: ICreateChatRequestDTO = {
            
            uid
        }
        try {
            await this.createChatUC.execute(ChatData)

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