import { Request, Response } from 'express';
import { ReadAllPostUC } from './ReadAllPostUC';
import { Post } from '../../../Service/Model/Post';

export class ReadAllPostController {
  constructor(
    private readAllPostUC:  ReadAllPostUC,
  ) {}

  async handle(request: Request, response: Response): Promise<Response> {

    try {
      const Posts: Post[] = await this.readAllPostUC.execute()

      return response.status(200).send().json(Posts);  
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(`Erro: ${error.message}`);
        return response.status(400).send('Erro: ' + error.message);
      } else {
        console.error(`Erro desconhecido: ${error}`);
        return response.status(500).send('Erro desconhecido');
      }
    }
  }
}