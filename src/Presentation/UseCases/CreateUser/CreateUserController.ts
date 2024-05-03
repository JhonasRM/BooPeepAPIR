import { Request, Response } from 'express';
import { UsersRepository } from '../../../Service/Repositories/UsersRepository';
import { ICreateUserRequestDTO } from './CreateUserDTO';
import { CreateUserUC } from './CreateUserUC';

export class CreateUserController {
  constructor(
    private createUserUC: CreateUserUC,
  ) {}

  async handle(request: Request, response: Response): Promise<void> {
    const { name, email, password } = request.body;

    try {
      const newUser: ICreateUserRequestDTO = {
        displayName: name,
        email: email,
        password: password,
        emailVerified: false,
        // photoURL: string,
        disabled: false,
      }
      const createUser = await this.createUserUC.execute(newUser)
      if(createUser.valido === true){
        response.json(createUser.data)
      }
      if(createUser.valido === false){
        throw new Error(createUser.erro)
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        if(error.message === 'Unauthorized'){
          response.status(401).send('Erro: o email já existe. ' + error.message);
        } else if(error.message === 'Bad Request'){
          response.status(400).send('Erro: firebase error. ' + error.message);
        } else if(error.message === 'Internal Server Error'){
          response.status(500).send('Erro: erro interno do servidor. ' + error.message);
        }
      } else {
        console.error(`Erro desconhecido: ${error}`);
        response.status(503).send('Erro desconhecido');
      }
    }
  }
}