import { Request, Response } from 'express';
import { ReadAllUsersUC } from './ReadAllUserUC';
import { User } from '../../../Service/Model/User';

export class ReadAllUsersController {
  constructor(
    private readAllUsersUC: ReadAllUsersUC,
  ) {}

  async handle(request: Request, response: Response): Promise<void> {
    try {
      const wantedUser = await this.readAllUsersUC.execute();
      if(wantedUser.valido === true){
        const users = wantedUser.data
        response.status(200).json(users)
      }
      if(wantedUser.valido === false){
        throw new Error(wantedUser.erro)
      }
    } catch (error) {
      if (error instanceof Error) {
        if(error.message === 'Not Found'){
          response.status(404).send('Erro: este email nao existe ' + error.message);
        }else if(error.message === 'Internal Server Error'){
          response.status(500).send('Erro: erro interno do servidor. ' + error.message);
        }
      } else {
        console.error(`Erro desconhecido: ${error}`);
        response.status(503).send('Erro desconhecido');
      }
    }
  }
}
