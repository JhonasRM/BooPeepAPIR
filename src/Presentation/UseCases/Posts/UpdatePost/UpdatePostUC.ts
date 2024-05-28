import { IReturnAdapter } from "../../../../utils/Interfaces/IReturnAdapter";
import { PostRepository } from "../../../../Service/Repositories/PostRepository";
import { IUpdatePostRequestDTO } from "./UpdatePostDTO";

export class UpdatePostUC {
    constructor(private postRepository: PostRepository) { }
    async execute(data: IUpdatePostRequestDTO): Promise<IReturnAdapter>{
        try {
            const updatedPost = await this.postRepository.updatePostField(data.postId, data.fieldToUpdate, data.newValue)
            if(updatedPost.val === false){
                throw new Error(updatedPost.erro)
            }    
            return { val: true,data: updatedPost.data}
        } catch (error) {
            if(error instanceof Error){
            return { val: false, erro: error.message}
        }
        return { val: false, erro: `Erro interno do servidor: ${error}`}
        }
        
    }
}