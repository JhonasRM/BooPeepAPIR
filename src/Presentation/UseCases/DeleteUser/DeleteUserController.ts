import { Request, Response } from 'express';
import { DeleteUserUC } from './DeleteUserUC';

export class DeleteUserController {
  constructor(
    private createUserUC: DeleteUserUC,
  ) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { email } = request.body;

    try {
      await this.createUserUC.delete(email);
  
      return response.status(200).send('Usuário excluído com sucesso');  
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