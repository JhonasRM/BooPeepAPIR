import { Request, Response } from 'express';
import { ReadAllUsersUC } from './ReadAllUserUC';

export class ReadAllUsersController {
  constructor(
    private readAllUsersUC: ReadAllUsersUC,
  ) {}

  async handle(request: Request, response: Response): Promise<void> {
    try {
      const wantedUser = await this.readAllUsersUC.execute();
      if(wantedUser.val === true){
        const users = wantedUser.data
        response.status(200).json(users)
      }
      if(wantedUser.val === false){
        throw new Error(wantedUser.erro)
      }
    } catch (error) {
      if (error instanceof Error) {
        if(error.message === 'Nenhum usuário foi encontrado'){
          response.status(404).send('Erro: nenhum usuário foi encontrado' + error.message);
        }else if(error.message !== 'Nenhum usuário foi encontrado'){
          response.status(500).send('Erro: erro interno do servidor. ' + error.message);
        }
      } else {
        console.error(`Erro desconhecido: ${error}`);
        response.status(503).send('Erro desconhecido');
      }
    }
  }
}
