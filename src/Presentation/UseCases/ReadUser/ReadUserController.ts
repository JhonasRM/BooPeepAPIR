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

      return response.status(200).json(wantedUser);  
    }catch (error) {
      console.error(`Erro: ${error instanceof Error ? error.message : 'desconhecido'}`);
      const statusCode = error instanceof Error ? 400 : 500;
      const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
      return response.status(statusCode).send(`Erro: ${errorMessage}`);
    }
    
  }
}