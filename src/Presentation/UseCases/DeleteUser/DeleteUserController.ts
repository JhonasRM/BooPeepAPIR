import { Request, Response } from 'express';
import { DeleteUserUC } from './DeleteUserUC';

export class DeleteUserController {
  constructor(
    private createUserUC: DeleteUserUC,
  ) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const {email} = request.body;
    try {
      await this.createUserUC.delete({email});
  
      return response.status(200).send('Usuário excluído com sucesso');  
    } catch (error) {
      console.error(`Erro: ${error instanceof Error ? error.message : 'desconhecido'}`);
      const statusCode = error instanceof Error ? 400 : 500;
      const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
      return response.status(statusCode).send(`Erro: ${errorMessage}`);
    }
  }
}
