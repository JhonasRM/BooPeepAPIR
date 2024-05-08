import { Request, Response } from 'express';
import { CreateUserUC } from './CreateUserUC';
import { ICreateUserRequestDTO } from './CreateUserDTO';

export class CreateUserController {
  constructor(
    private createUserUC: CreateUserUC,
  ) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;
    
    // Verifica se os campos estão preenchidos
    if (!name || !email || !password) {
      return response.status(400).send('Erro: Campos obrigatórios não preenchidos');
    }
    
    try {
      console.log(name, email, password);
      
      // Verifica se os campos não estão vazios
      const isNameEmpty = name.trim() === '';
      const isEmailEmpty = email.trim() === '';
      const isPasswordEmpty = password.trim() === '';
      if (isNameEmpty || isEmailEmpty || isPasswordEmpty) {
        return response.status(400).send('Erro: Campos obrigatórios não preenchidos');
      }
      
      const createdUser = await this.createUserUC.execute({
        name: name,
        email: email,
        password: password
      });
      
      if (createdUser instanceof Error) {
        throw new Error(createdUser.message);
      }
      
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
