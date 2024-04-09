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

            if (typeof updatedPost === 'string') {
                return response.status(400).json({ error: updatedPost });
            }

            return response.status(200).send();
        } catch (error: unknown) {
            console.error('Erro ao lidar com a solicitação:', error);
        return response.status(500).json({ error: 'Erro interno do servidor' });
        }
    }
}