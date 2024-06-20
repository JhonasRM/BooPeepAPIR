import { Request, Response } from 'express';
import { CreateComentUC } from './CreateComentUC';
import { ICreateComentRequestDTO } from './CreateComentDTO';

export class CreatePostController {
    constructor(
        private createComentUC: CreateComentUC,
    ) { }

    async handle(request: Request, response: Response): Promise<void> {
        const {
            postID,
            uid,
            text
        } = request.body;

        const comentsData: ICreateComentRequestDTO = {
            postID,
            uid,
            text
        }
        try {
            const createpost = await this.createComentUC.execute(comentsData)
            if(createpost.val === false){
                throw new Error(createpost.erro as string)
            }
            response.status(201).send(createpost.data);
        } catch (error) {
            if(error instanceof Error){
                if(error.message === 'Usuário não encontrado'){
                    response.status(404).send(error.message)
                } else if(error.message !== 'Usuário não encontrado'){
                    response.status(400).send(error.message)
                }
            } else {
            response.status(500).send(`Internal Server Error: ${error}`)
        }
        }
    }
}