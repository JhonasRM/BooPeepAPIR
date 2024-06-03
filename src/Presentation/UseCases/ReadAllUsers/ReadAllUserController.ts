import { Request, Response } from 'express';
import { ReadAllUsersUC } from './ReadAllUserUC';
import { User } from '../../../Service/Model/User';

export class ReadAllUsersController {
  constructor(
    private readAllUsersUC: ReadAllUsersUC,
  ) {}

  async handle(request: Request, response: Response): Promise<void> {
    try {
      const users: User[] = await this.readAllUsersUC.execute();
      
      if (!users || users.length === 0) {
        throw new Error('Nenhum usuário encontrado');
      }
      
      response.status(200).json(users);
    } catch (error) {
      console.error(`Erro: ${error instanceof Error ? error.message : 'desconhecido'}`);
      const statusCode = error instanceof Error ? 400 : 500;
      const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
      response.status(statusCode).send(`Erro: ${errorMessage}`);
    }
  }
}
