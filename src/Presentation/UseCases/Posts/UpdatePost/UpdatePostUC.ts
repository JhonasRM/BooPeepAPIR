import { PostRepository } from "../../../../Service/Repositories/PostRepository";
import { IUpdatePostRequestDTO } from "./UpdatePostDTO";

export class UpdatePostUC {
    constructor(private postRepository: PostRepository) { }
    async execute(data: IUpdatePostRequestDTO): Promise<{ valido: boolean; erro?: string | unknown, data?: string }>{
        try {
            const updatedPost = await this.postRepository.updatePostField(data.postId, data.fieldToUpdate, data.newValue)
            if(updatedPost.valido === false){
                throw new Error(updatedPost.erro)
            }    
            return { valido: true,data: updatedPost.data}
        } catch (error) {
            if(error instanceof Error){
            return { valido: false, erro: error.message}
        }
        return { valido: false, erro: error}
        }
        
    }
}