import { Router, Request, Response } from 'express';
import { User } from '../../../Service/Model/User';
import { CreateUserUC } from './CreateUserUC';
import { ICreateUserRequestDTO } from './CreateUserDTO';
import { UsersRepository } from '../../../Service/Repositories/UsersRepository';

export class CreateUserController {
  constructor(
    private createUC: CreateUserUC,
  ) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;

    try {
      await this.createUC.execute({
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