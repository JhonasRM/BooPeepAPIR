import { Request, Response } from "express";
import { CreateUserRequestDTO } from "./CreateUserDTO";
import { CreateUserUC } from "./CreateUserUC";
import { UserOnAuth } from "../../../../Service/Model/UserOnAuth";
import { UserOnFirestore } from "../../../../Service/Model/UserOnFireStore";
export class CreateUserController {
  constructor(private createUserUC: CreateUserUC) {}

  async handle(request: Request, response: Response): Promise<void> {
    const { displayName, email, password } = request.body;

    if (!displayName || !email || !password) {
      response.status(400).send("Erro: Campos obrigatórios não preenchidos");
    }
    const data = {
      displayName: displayName,
      email: email,
      password: password,
    }

    try {
      const newUser: CreateUserRequestDTO = new CreateUserRequestDTO(data);

      const createUser = await this.createUserUC.execute(newUser);
      if (createUser.val === true) {
        response.status(201).json('Usuário criado com sucesso');
      }
      if (createUser.val === false) {
        throw new Error(createUser.erro);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        if (error.message === "Unauthorized") {
          response
            .status(401)
            .send("Erro: o email já existe. " + error.message);
        } else if (error.message === "Bad Request") {
          response.status(400).send("Erro: erro na requisição. " + error.message);
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
