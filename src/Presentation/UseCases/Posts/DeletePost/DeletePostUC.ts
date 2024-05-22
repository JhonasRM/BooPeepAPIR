
import { PostRepository } from "../../../../Service/Repositories/PostRepository";
import { DeletePostRequestDTO } from "./DeletePostDTO";

export class DeletePostUC{
    constructor( private postRepository: PostRepository){}
    async execute(deletePostDTO: DeletePostRequestDTO):Promise<{ valido: boolean; erro?: string | unknown, data?: string }>{
        try {
            const deletePost = await this.postRepository.DeletePost(deletePostDTO.postID)
            if(deletePost.valido === false){
                throw new Error(deletePost.erro)
            }
            return { valido: false, data: deletePost.data}
        } catch (error) {
            if(error instanceof Error){
                return { valido: false, erro: error.message}
            }
            return { valido: false, erro: `Internal Server Error: ${error}`}
        }
    }
}