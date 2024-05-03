import { Request, Response, response } from 'express';
import { UpdateUserUC } from './UpdateUserUC';
import { IUpdateUserRequestDTO } from './UpdateUserDTO';

export class UpdateUserController {
  constructor(
    private updateUserUC: UpdateUserUC,
  ) {}

  async handle(request: Request, response: Response): Promise<void> {
    const { name, email, password} = request.body

    const updateUser: IUpdateUserRequestDTO = {
      displayName: name,
      email: email,
      password: password,
      emailVerified: false,
      // photoURL: string,
      disabled: false,
    }
    const updatedUser = await this.updateUserUC.execute(updateUser)
    if(updatedUser.valido === true){
      response.status(201).json(updatedUser.data)
    }
    if(updatedUser.valido === false){
      throw new Error(updatedUser.erro)
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      if(error.message === 'Not Found'){
        response.status(401).send('Erro: email nao enconrtado. ' + error.message);
      } else if(error.message === 'Bad Request'){
        response.status(400).send('Erro: erro de requisiçao. ' + error.message);
      } else if(error.message === 'Internal Server Error'){
        response.status(500).send('Erro: erro interno do servidor. ' + error.message);
      }
    } else {
      console.error(`Erro desconhecido: ${error}`);
      response.status(503).send('Erro desconhecido');
    }
  }
}
