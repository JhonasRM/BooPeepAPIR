
import { IReturnAdapter } from "../../../../Service/Interfaces/IReturnAdapter";
import { PostRepository } from "../../../../Service/Repositories/PostRepository";
import { DeletePostRequestDTO } from "./DeletePostDTO";

export class DeletePostUC{
    constructor( private postRepository: PostRepository){}
    async execute(deletePostDTO: DeletePostRequestDTO):Promise<IReturnAdapter>{
        try {
            const deletePost = await this.postRepository.deletePost(deletePostDTO.postID)
            if(deletePost.val === false){
                throw new Error(deletePost.erro)
            }
            return { val: false, data: deletePost.data}
        } catch (error) {
            if(error instanceof Error){
                return { val: false, erro: error.message}
            }
            return { val: false, erro: `Erro interno do servidor: ${error}`}
        }
    }
}