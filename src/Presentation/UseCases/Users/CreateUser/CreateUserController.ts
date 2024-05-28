import { Request, Response } from "express";
import { CreateUserRequestDTO } from "./CreateUserDTO";
import { CreateUserUC } from "./CreateUserUC";
export class CreateUserController {
  constructor(
    private createUserUC: CreateUserUC
  ) {}

  async handle(request: Request, response: Response): Promise<void> {
    const { displayName, email, password } = request.body;

    if (!displayName || !email || !password) {
      response.status(400).send("Erro: Campos obrigatórios não preenchidos");
    }
    const requestData = {
      displayName: displayName as string,
      email: email as string,
      password: password as string,
    };
    try {
      const data: CreateUserRequestDTO = new CreateUserRequestDTO(requestData);
      const createUser = await this.createUserUC.execute(data);
      if (createUser.val === true) {
          response.status(201).json(createUser.data);
        }
      if (createUser.val === false) {
        throw new Error(createUser.erro);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        if (error.message === 'Este email já está cadastrado') {
          response
            .status(401)
            .send("Erro: este email já está cadastrado ");
        } else if (error.message === 'Erro ao cadastrar dados do usuário' || error.message === 'Erro ao cadastrar usuário no auth.') {
          response
            .status(400)
            .send("Erro: erro ao efetuar o cadsatro " + error.message);
        } else if (error.message === "Internal Server Error") {
          response
            .status(500)
            .send("Erro: erro interno do servidor. " + error.message);
        }
      } else {
        console.error(`Erro desconhecido: ${error}`);
        response.status(503).send("Erro desconhecido");
      }
    }
  }
}
