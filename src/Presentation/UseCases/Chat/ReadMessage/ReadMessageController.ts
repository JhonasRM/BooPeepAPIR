import { Request, Response } from "express";
import { ReadMessageUC } from "./ReadMessageUC";
import { Chat } from "../../../../Service/Model/Chat";
import { IReadMessageRequestDTO } from "./ReadMessageDTO";
import { Message } from "../../../../Service/Model/Message";

export class ReadMessageController {
  constructor(private readMessageUC: ReadMessageUC) {}

  async handle(request: Request, response: Response): Promise<void> {
    try {
      console.log(request.query)
      const chatID= request.query.chatID;
      if (!chatID) {
        return;
      }
      const readDTO: IReadMessageRequestDTO = {
        chatID: chatID as string,
      };
      const getChat = await this.readMessageUC.execute(readDTO);

      if (getChat.val === false) {
        throw new Error(getChat.erro);
      }
      const chats: Message[] = getChat.data as unknown as Message[];

      response.status(200).json(chats);
    } catch (error) {
      if (error instanceof Error) {
        if (error.message === "Nenhum chat encontrado") {
          response.status(404).send(error.message);
        } else {
          response.status(400).send(`Erro de requisição: ${error.message}`);
        }
      } else {
      response.status(500).send(`Erro interno do servidor: ${String(error)}`);
    }
    }
  }
}
