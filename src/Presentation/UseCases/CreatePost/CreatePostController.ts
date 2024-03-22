import { Request, Response } from 'express';
import { CreatePostUC } from './CreatePostUC';

export class CreatePostController {
    constructor(
        private createPostUC: CreatePostUC,
    ) { }

    async handle(request: Request, response: Response): Promise<Response> {
        const {
            description,
            data,
            local,
            status,
            UserID
        } = request.body;

        try {
            await this.createPostUC.execute({
                description,
                data,
                local,
                status,
                UserID
            })

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