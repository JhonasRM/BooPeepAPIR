import { Request, Response } from 'express';
import { ReadUserUC } from './ReadUserUC';
import { IReadUserRequestDTO } from './ReadUserDTO';

export class ReadUserController {
  constructor(
    private readUserUC: ReadUserUC,
  ) {}

  async handle(request: Request, response: Response): Promise<void> {
    const { email, password } = request.query;
    const data: IReadUserRequestDTO = {
      email: email as string,
      password: password as string
    }
    try {
      const wantedUser = await this.readUserUC.execute(data)
      if(wantedUser.val === true){
        response.status(200).json(wantedUser.data)
      } else if(wantedUser.val === false){
        throw new Error(wantedUser.erro)
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        if(error.message === 'Usuário não encontrado.'){
          response.status(404).send('Erro: usuário não encontrado');
        } else if(error.message === 'Os dados do usuário não foram encontrados'){
          response.status(400).send('Erro: Os dados não foram encontrados. ');
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