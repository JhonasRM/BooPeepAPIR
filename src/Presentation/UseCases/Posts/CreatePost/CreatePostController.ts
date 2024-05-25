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
            email
        } = request.body;

        const UserID = ''
        const PostData: ICreatePostRequestDTO = {
        description,
            local,
            status,
            UserID
        }
        try {
            const createpost = await this.createPostUC.execute(PostData,  email)
            if(createpost.val === false){
                throw new Error(createpost.erro as string)
            }
            response.status(201).send(createpost.data);
        } catch (error) {
            if(error instanceof Error){
                if(error.message === 'Unauthorized'){
                    response.status(404).send('Usuário não encontrado.')
                }
                    response.status(400).send(error.message)
            }
            response.status(500).send(`Internal Server Error: ${error}`)
        }
    }
}