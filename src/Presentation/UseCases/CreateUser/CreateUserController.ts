import { Request, Response } from 'express';
import { CreateUserUC } from './CreateUserUC';
import { ICreateUserRequestDTO } from './CreateUserDTO';

export class CreateUserController {
  constructor(
    private createUserUC: CreateUserUC,
  ) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;
    const DTO: ICreateUserRequestDTO = {
      name: String(name),
      email: String(email),
      password: String(password)
    }
    try {
      console.log(name, email, password)
      const createdUser = await this.createUserUC.execute(DTO)
  
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