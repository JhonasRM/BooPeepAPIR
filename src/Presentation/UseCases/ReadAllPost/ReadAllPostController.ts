import { Request, Response } from 'express';
import { ReadAllPostUC } from './ReadAllPostUC';
import { Post } from '../../../Service/Model/Post';

export class ReadAllPostController {
  constructor(
    private readAllPostUC:  ReadAllPostUC,
  ) {}

  async handle(request: Request, response: Response): Promise<void> {

    try {
      const Posts: Post[] = await this.readAllPostUC.execute()

      response.status(200).send().json(Posts);  
      return
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(`Erro: ${error.message}`);
        response.status(400).send('Erro: ' + error.message);
        return
      } else {
        console.error(`Erro desconhecido: ${error}`);
        response.status(500).send('Erro desconhecido');
        return
      }
    }
  }
}