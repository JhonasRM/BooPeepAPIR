import { Request, Response, response } from 'express';
import { UpdateUserUC } from './UpdateUserUC';
import { IUpdateUserRequestDTO } from './UpdateUserDTO';

export class UpdateUserController {
  constructor(
    private updateUserUC: UpdateUserUC,
  ) {}

  async handle(request: Request, response: Response): Promise<void> {

       const { email, fieldToUpdate, newValue} = request.body
        const updateUser: IUpdateUserRequestDTO = {
          email: email, 
          fieldToUpdate: fieldToUpdate,
          newValue: newValue,
        }
    const updatedUser = await this.updateUserUC.execute(updateUser)
    if(updatedUser.val === true){
      response.status(200).send('Usuário alterado com sucesso')
    }
    if(updatedUser.val === false){
      console.log(updatedUser.erro)
      throw new Error(updatedUser.erro)
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      if(error.message === 'Usuário não encontrado.'){
        response.status(404).send('Erro: ' + error.message);
      } else if(error.message  !== 'Usuário não encontrado.'){
        response.status(400).send('Erro: erro de requisiçao. ' + error.message);
      }
    } else {
      console.error(`Erro desconhecido: ${error}`);
      response.status(500).send(`Erro interno do servidor: ${error}`);
    }
  }
}
