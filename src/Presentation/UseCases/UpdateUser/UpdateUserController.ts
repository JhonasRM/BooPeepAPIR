import { Request, Response } from 'express';
import { UpdateUserUC } from './UpdateUserUC';

export class UpdateUserController {
  constructor(
    private updateUserUC: UpdateUserUC,
  ) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;

    try {
      await this.updateUserUC.update({
        name,
        email,
        password
      });
  
      return response.status(200).send('Usuário atualizado com sucesso');  
    } catch (error) {
      console.error(`Erro: ${error instanceof Error ? error.message : 'desconhecido'}`);
      const statusCode = error instanceof Error ? 400 : 500;
      const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
      return response.status(statusCode).send(`Erro: ${errorMessage}`);
    }
  }
}