import { Request, Response } from 'express';
import { LoginUserUC } from './LoginUserUC';
import { ILoginUserRequestDTO } from './LoginUserDTO';

export class LoginUserController {
  constructor(
    private loginUseruc: LoginUserUC,
  ) {}

  async handle(request: Request, response: Response): Promise<void> {
    const { email, password } = request.body
    if (email && password) {
      response.send(`Email: ${email}, Password: ${password}`);
    } else {
      response.status(400).send('Email and password are required');
    }
    try {
      const wantedUser = await this.loginUseruc.execute({
        email,
        password
      })
      if(wantedUser.valido === true){
        response.status(200).json(wantedUser.data)
      }
      if(wantedUser.valido === false){
        throw new Error(wantedUser.erro)
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        if(error.message === 'Not Found'){
          response.status(404).send('Erro: este email nao existe ' + error.message);
        } else if(error.message === 'Unauthorized'){
          response.status(401).send('Erro: senha incorreta. ' + error.message);
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