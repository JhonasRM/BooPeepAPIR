 
import { Request, Response } from 'express';
import { ReadMessageUC } from './ReadMessageUC';
import { Chat } from '../../../../Service/Model/Chat';
import { IReadMessageRequestDTO } from './ReadMessageDTO';

export class ReadMessageController {
  constructor(
    private readMessageUC: ReadMessageUC,
  ) { }

  async handle(request: Request, response: Response): Promise<void> {
    try {
      const { chatid } = request.params;
      if (!chatid) {
        response.status(400).send('O chatid é obrigatório');
        return;
      }
      const readDTO: IReadMessageRequestDTO = {
        chatID: chatid
      }
      const getChat = await this.readMessageUC.execute(readDTO)
      
      if(getChat.valido === false){
        throw new Error(getChat.erro)
      }
      const chats: Chat[] = getChat.value as unknown as Chat[]
     
      response.status(200).json(chats);
    } catch (error) {
    if(error instanceof Error){
      if(error.message === 'Nenhum chat encontrado'){
        response.status(404).send(error.message)
      } else if(error.message !== 'Nenhum Chat encontrado'){
        response.status(400).send(`Erro de requisição: ${error.message}`)
      }
    }
    response.status(500).send(`Erro interno do servidor: ${String(error)}`)
    }
  }
}