import { Request, Response } from 'express';
import { Post } from '../../../../Service/Model/Post';
import { ReadComentsUC } from './ReadComentUC';
import { ReadComentsRequestDTO } from './ReadComentsDTO';
import { Coment } from '../../../../Service/Model/Coment';

export class ReadComentsController {
  constructor(
    private readComentsUC: ReadComentsUC,
  ) { }

  async handle(request: Request, response: Response): Promise<void> {
    const {postID} = request.query
    const data: ReadComentsRequestDTO = {
      postID: postID as string
    }
    try {
      const getComents = await this.readComentsUC.execute(data)
      if(getComents.val === false){
        throw new Error(getComents.erro)
      } else if(getComents.val === true){
      const coments: Coment[] = getComents.data as Coment[]
      response.status(200).json(coments);
    }
    } catch (error) {
    if(error instanceof Error){
      if(error.message === 'Postagem não encontrada'){
        response.status(404).send(error.message)
      } else if(error.message !== 'Postagem não encontrada'){
        response.status(400).send(`Erro de requisição: ${error.message}`)
      }
    } else {
    response.status(500).send(`Erro interno do servidor: ${error}`)
    }}
  }
}
