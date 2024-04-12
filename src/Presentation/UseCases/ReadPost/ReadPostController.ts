import { Request, Response } from 'express';
import { ReadPostUC } from './ReadPostUC';

export class ReadPostController {
    constructor(
        private readPostUC: ReadPostUC,
    ) { }

    async handle(request: Request, response: Response): Promise<Response> {
        const { 
            postId,
            description,
            local,
            status,
            UserID } = request.body;

        try {
            const wantedUser = await this.readPostUC.execute({
                postId,
                description,
                local,
                status,
                UserID,
            })

            return response.status(200).json(wantedUser);
        } catch (error) {
            console.error(`Erro: ${error instanceof Error ? error.message : 'desconhecido'}`);
            const statusCode = error instanceof Error ? 400 : 500;
            const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
            return response.status(statusCode).send(`Erro: ${errorMessage}`);
          }
    }
}