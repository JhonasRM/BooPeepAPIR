import { Request, Response } from "express";
import { LoginUserUC } from "./LoginUserUC";
import { ILoginUserRequestDTO } from "./LoginUserDTO";

export class LoginUserController {
  constructor(private loginUseruc: LoginUserUC) {}

  async handle(request: Request, response: Response): Promise<void> {
    const { email, password } = request.body;
    if (!email && !password) {
      response.status(400).send("Email and password are required");
    }
    try {
      const wantedUser = await this.loginUseruc.execute({
        email,
        password,
      });
      if (wantedUser.val === false) {
        console.log("continuou");
        throw new Error(wantedUser.erro);
      } else if (wantedUser.val === true){
      console.log("acabou");
      response.status(200).json(wantedUser.data);
    }
    } catch (error: unknown) {
      console.log("entrou no erro");
      if (error instanceof Error) {
        if (error.message === "Usuário não encontrado.") {
          response.status(404).send("Erro: usuário não encontrado.");
        } else if (error.message === "Login não autorizado.") {
          response.status(401).send("Erro: senha incorreta.");
        } else if (
          error.message !== "Usuário não encontrado." &&
          error.message !== "Login não autorizado."
        ) {
          response
            .status(500)
            .send("Erro: erro interno do servidor. " + error.message);
        }
      } else {
      response.status(503).send("Erro desconhecido");
    }
    }
  }
}
