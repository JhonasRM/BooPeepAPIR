
import { IReturnAdapter } from "../../../../utils/Interfaces/IReturnAdapter";
import { PostRepository } from "../../../../Service/Repositories/PostRepository";
import { DeleteComentRequestDTO } from "./DeleteComentDTO";
import { ComentRepository } from "../../../../Service/Repositories/ComentsRepository";

export class DeleteComentUC{
    constructor( private postRepository: PostRepository, private comentRepository: ComentRepository){}
    async execute(deletePostDTO: DeleteComentRequestDTO):Promise<IReturnAdapter>{
        try {
            const findPost = await this.postRepository.getPost(deletePostDTO.postID)
            if(findPost.val === false){
                throw new Error(findPost.erro)
            }
            const deleteComent = await this.comentRepository.deleteComent(deletePostDTO.postID, deletePostDTO.comentID)
            if(deleteComent.val === false){
                throw new Error(deleteComent.erro)
            }
            return { val: false, data: deleteComent.data}
        } catch (error) {
            if(error instanceof Error){
                return { val: false, erro: error.message}
            }
            return { val: false, erro: `Erro interno do servidor: ${error}`}
        }
    }
}