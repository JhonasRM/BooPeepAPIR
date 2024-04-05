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