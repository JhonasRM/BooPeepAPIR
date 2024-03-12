import { Router, Request, Response } from 'express';
import { User } from '../../../Service/Model/User';
import { CreateUserUC } from './CreateUserUC';
import { ICreateUserRequestDTO } from './CreateUserDTO';
import { IUsersRepository } from '../../../Service/Repositories/IUser';

export class CreateUserController {
  constructor(
    private createUserUseCase: CreateUserUC,
  ) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;

    try {
      await this.createUserUseCase.execute({
        name,
        email,
        password
      })
  
      return response.status(201).send();  
    } catch (err) {
      return response.status(400).json({
        message: err.message || 'Unexpected error.'
      })
    }
  }
}