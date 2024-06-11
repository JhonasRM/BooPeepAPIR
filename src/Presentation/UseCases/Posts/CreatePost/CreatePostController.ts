import { Request, Response } from 'express';
import { CreatePostUC } from './CreatePostUC';
import { ICreatePostRequestDTO } from './CreatePostDTO';

export class CreatePostController {
    constructor(
        private createPostUC: CreatePostUC,
    ) { }

    async handle(request: Request, response: Response): Promise<void> {
        const {
            description,
            local,
            status,
            UserID
        } = request.body;

        const PostData: ICreatePostRequestDTO = {
        description,
            local,
            status,
            UserID
        }
        try {
            const createpost = await this.createPostUC.execute(PostData)
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