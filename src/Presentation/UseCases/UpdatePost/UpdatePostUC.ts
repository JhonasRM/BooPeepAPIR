import { PostRepository } from "../../../Service/Repositories/PostRepository";
import { IUpdatePostRequestDTO } from "./UpdatePostDTO";

export class UpdatePostUC {
    constructor(private postRepository: PostRepository) { }
    async execute(data: IUpdatePostRequestDTO) {
        const updatedPost = await this.postRepository.updatePostField(data.postID, data.fieldToUpdate, data.newValue)

        if (updatedPost === 'Documento não encontrado') {
            console.error('O documento especificado não foi encontrado.');
        } else if (updatedPost === 'O campo requerido não existe no documento') {
            console.error(`O campo '${data.fieldToUpdate}' não existe no documento especificado.`);
        } else if (updatedPost === 'O tipo do valor anterior do campo requerido não corresponde ao tipo do novo valor ') {
            console.error(`O tipo do valor anterior não corresponde ao tipo do novo valor.`);
        } else if (updatedPost === 'Campo atualizado com sucesso') {
            console.log('Campo atualizado com sucesso.');
        }
    }
}