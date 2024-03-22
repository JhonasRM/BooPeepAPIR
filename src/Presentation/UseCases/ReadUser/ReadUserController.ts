import { Request, Response } from 'express';
import { ReadUserUC } from './ReadUserUC';

export class ReadUserController {
  constructor(
    private readUserUC: ReadUserUC,
  ) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    try {
      const wantedUser = await this.readUserUC.execute({
        email,
        password
      })

      return response.status(200).send().json(wantedUser);  
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