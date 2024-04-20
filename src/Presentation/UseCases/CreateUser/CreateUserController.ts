import { Request, Response } from 'express';
import { CreateUserUC } from './CreateUserUC';

export class CreateUserController {
  constructor(
    private createUserUC: CreateUserUC,
  ) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;

    try {
      const createdUser = await this.createUserUC.execute({
        name,
        email,
        password
      })
  
      return response.status(201).json(createdUser);  
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