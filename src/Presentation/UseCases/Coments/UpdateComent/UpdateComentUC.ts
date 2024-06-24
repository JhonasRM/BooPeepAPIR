import { IReturnAdapter } from "../../../../utils/Interfaces/IReturnAdapter";
import { PostRepository } from "../../../../Service/Repositories/PostRepository";
import { ComentRepository } from "../../../../Service/Repositories/ComentsRepository";
import { IUpdateComentRequestDTO } from "./UpdateComentDTO";

export class UpdateComentUC {
    constructor(private postRepository: PostRepository, private  comentRepository: ComentRepository) { }
    async execute(data: IUpdateComentRequestDTO): Promise<IReturnAdapter>{
        try {
            const getPost = await this.postRepository.getPost(data.postID)
            if(getPost.val === false){
                throw new Error(getPost.erro)
            }    
            const UpdateComent = await this.comentRepository.updateComent(data.postID, data.comentID, data.newValue)
            if(UpdateComent.val === false){
                throw new Error(UpdateComent.erro)
            }
            return { val: true,data: UpdateComent.data}
        } catch (error) {
            if(error instanceof Error){
            return { val: false, erro: error.message}
        }
        return { val: false, erro: `Erro interno do servidor: ${error}`}
        }
        
    }
}