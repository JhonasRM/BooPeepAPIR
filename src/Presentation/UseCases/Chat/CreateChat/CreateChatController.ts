import { Request, Response } from 'express';
import { CreateChatUC } from './CreateChatUC';
import { ICreateChatRequestDTO } from './CreateChatDTO';

export class CreateChatController {
    constructor(
        private createChatUC: CreateChatUC,
    ) { }

    async handle(request: Request, response: Response): Promise<void> {
        const {
  
           uid         
        } = request.body;

        const UserID = ''
        const ChatData: ICreateChatRequestDTO = {
            uid
        }
        try {
            const newChat = await this.createChatUC.execute(ChatData)
            if(newChat.valido === false){
                throw new Error(newChat.erro)
            }
            response.status(201).send(newChat.data);
        } catch (error: unknown) {
            if (error instanceof Error) {
                if(error.message === 'O chat já exite'){
                    response.status(401).send(error.message)
                }
                console.error(`Erro: ${error.message}`);
                response.status(400).send('Erro:' + error.message);
            } else {
                console.error(`Erro desconhecido: ${error}`);
                response.status(500).send('Erro desconhecido');
            }
        }
    }
}