import { Request, Response } from 'express';
import { ReadUserUC } from './ReadAllUserUC';
import { User } from '../../../Service/Model/User';

export class ReadUserController {
  constructor(
    private readUserUC: ReadUserUC,
  ) {}

  async handle(request: Request, response: Response): Promise<Response> {

    try {
      const Users: User[] = await this.readUserUC.execute()

      return response.status(200).send().json(Users);  
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