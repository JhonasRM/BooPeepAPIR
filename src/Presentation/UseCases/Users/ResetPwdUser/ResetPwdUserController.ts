import { Request, Response } from "express";
import { ResetPwdUserUC } from "./ResetPwdUserUC";
import { IResetPwdUserRequestDTO } from "./ResetPwdUserDTO";

export class ResetPwdUserController {
  constructor(private resetpwdUC: ResetPwdUserUC) {}
  async handle(request: Request, response: Response) {
    const { email } = request.params;
    const data: IResetPwdUserRequestDTO = {
      email: email,
    };
    try {
      const resetPassword = await this.resetpwdUC.execute(data);
      if (resetPassword.valido === false) {
        throw new Error(resetPassword.erro);
      }
      response.status(200).send(resetPassword.value);
    } catch (error: unknown) {
      if (error instanceof Error) {
        if (error.message === "Not Found") {
          response
            .status(404)
            .send("Erro: este email nao existe " + error.message);
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
