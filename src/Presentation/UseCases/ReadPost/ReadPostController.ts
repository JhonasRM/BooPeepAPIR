import { Request, Response } from 'express';
import { ReadPostUC } from './ReadPostUC';

export class ReadPostController {
    constructor(
        private readPostUC: ReadPostUC,
    ) { }

    async handle(request: Request, response: Response): Promise<Response> {
        const { 
            id,
            description,
            data,
            local,
            status,
            UserID } = request.body;

        try {
            const wantedUser = await this.readPostUC.execute({
                id,
                description,
                data,
                local,
                status,
                UserID,
            })

            return response.status(200).send().json(wantedUser);
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