import { Request, Response } from 'express';
import { ReadAllPostUC } from './ReadAllPostUC';
import { Post } from '../../../../Service/Model/Post';

export class ReadAllPostController {
  constructor(
    private readAllPostUC: ReadAllPostUC,
  ) { }

  async handle(request: Request, response: Response): Promise<void> {
    try {
      const posts: Post[] = await this.readAllPostUC.execute();
      response.status(200).json(posts); // Envie a resposta diretamente após a execução do UC.
    } catch (error) {
      console.error(`Erro: ${error instanceof Error ? error.message : 'desconhecido'}`);
      const statusCode = error instanceof Error ? 400 : 500;
      const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
      response.status(statusCode).send(`Erro: ${errorMessage}`);
    }
  }
}
