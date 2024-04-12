import { Request, Response } from 'express';
import { CreatePostUC } from './CreatePostUC';
import { ICreatePostRequestDTO } from './CreatePostDTO';

export class CreatePostController {
    constructor(
        private createPostUC: CreatePostUC,
    ) { }

    async handle(request: Request, response: Response): Promise<Response> {
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
            await this.createPostUC.execute(PostData,  email)

            return response.status(201).send();
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