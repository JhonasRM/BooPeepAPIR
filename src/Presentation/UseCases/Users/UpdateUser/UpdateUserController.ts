import { Request, Response, response } from 'express';
import { UpdateUserUC } from './UpdateUserUC';
import { IUpdateUserRequestDTO } from './UpdateUserDTO';

export class UpdateUserController {
  constructor(
    private updateUserUC: UpdateUserUC,
  ) {}

  async handle(request: Request, response: Response): Promise<void> {
    const { email, fieldToUpdate, newValue} = request.body
    if(fieldToUpdate === 'password'){
       const { resetEmail, fieldtoReset, newPassword, token} = request.body
        const UpdatePassword: IUpdateUserRequestDTO = {
          email: resetEmail, 
          fieldToUpdate: fieldtoReset,
          newValue: newPassword,
          token: token
        }
    }
    const updateUser: IUpdateUserRequestDTO = {
      email: email,
      fieldToUpdate: fieldToUpdate,
      newValue: newValue,
    }
    const updatedUser = await this.updateUserUC.execute(updateUser)
    if(updatedUser.valido === true){
      response.status(200).send('Usuário alterado com sucesso')
    }
    if(updatedUser.valido === false){
      console.log(updatedUser.erro)
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
