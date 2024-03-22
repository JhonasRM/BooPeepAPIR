import { Request, Response } from 'express';
import { UpdatePostUC } from "./UpdatePostUC";

export class UpdatePostController {
    constructor(
        private updatePostUC: UpdatePostUC,
    ) { }

    async handle(request: Request, response: Response): Promise<Response> {
        const {
            postID,
            fieldToUpdate,
            newValue,
        } = request.body;

        try {
            const updatedPost = await this.updatePostUC.execute({
                postID,
                fieldToUpdate,
                newValue
            })

            return response.status(200).send(updatedPost);
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