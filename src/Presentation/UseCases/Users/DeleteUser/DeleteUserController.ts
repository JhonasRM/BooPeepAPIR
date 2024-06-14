import { Request, Response } from 'express';
import { DeleteUserUC } from './DeleteUserUC';

export class DeleteUserController {
  constructor(
    private deleteUserUC: DeleteUserUC,
  ) {}

  async handle(request: Request, response: Response): Promise<void> {
    const {email} = request.query;
    try {
      const deleteUser = await this.deleteUserUC.delete({email});
      if(deleteUser.val === true){
        response.status(200).send(deleteUser.data)
      }
      if(deleteUser.val === false){
        throw new Error(deleteUser.erro)
      }
    } catch (error) {
      if (error instanceof Error) {
        if(error.message === 'Not Found'){
          response.status(401).send('Erro: o usuário não existe. ' + error.message);
        } else if(error.message === 'Bad Request'){
          response.status(400).send('Erro: erro ao deletar o usuário. ' + error.message);
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
