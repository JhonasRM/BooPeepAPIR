import { Request, Response } from 'express';
import { ReadUserUC } from './ReadUserUC';

export class CreateUserController {
  constructor(
    private readUserUC: ReadUserUC,
  ) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;

    try {
      await this.readUserUC.execute({
        name,
        email,
        password
      })
  
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