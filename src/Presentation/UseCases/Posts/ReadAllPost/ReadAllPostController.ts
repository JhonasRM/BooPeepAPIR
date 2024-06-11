import { Request, Response } from 'express';
import { ReadAllPostUC } from './ReadAllPostUC';
import { Post } from '../../../../Service/Model/Post';

export class ReadAllPostController {
  constructor(
    private readAllPostUC: ReadAllPostUC,
  ) { }

  async handle(request: Request, response: Response): Promise<void> {
    try {
      const getAllPost = await this.readAllPostUC.execute()
      if(getAllPost.val === false){
        throw new Error(getAllPost.erro)
      } else if(getAllPost.val === true){
      const posts: Post[] = getAllPost.data as Post[]
      response.status(200).json(posts);
    }
    } catch (error) {
    if(error instanceof Error){
      if(error.message === 'Nenhuma postagem encontrada'){
        response.status(404).send(error.message)
      } else if(error.message !== 'Nenhuma postagem encontrada'){
        response.status(400).send(`Erro de requisição: ${error.message}`)
      }
    } else {
    response.status(500).send(`Erro interno do servidor: ${error}`)
    }}
  }
}
