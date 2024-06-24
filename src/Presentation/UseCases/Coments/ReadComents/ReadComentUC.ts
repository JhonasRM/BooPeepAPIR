import { IReturnAdapter } from "../../../../utils/Interfaces/IReturnAdapter"
import { PostRepository } from "../../../../Service/Repositories/PostRepository"
import { ReadComentsRequestDTO } from "./ReadComentsDTO"
import { ComentRepository } from "../../../../Service/Repositories/ComentsRepository"


export class ReadComentsUC {
    constructor(private postRepository: PostRepository, private comentRepository: ComentRepository){ }
    async execute(data: ReadComentsRequestDTO): Promise<IReturnAdapter>{
        try {
            const getPost = await this.postRepository.getPost(data.postID)
            if (getPost.val === false) {
                throw new Error(getPost.erro)
            } 
            const readComents = await this.comentRepository.getComents(data.postID)
            if(readComents.val === false){
                throw new Error(readComents.erro)
            }
            return { val: true, data: readComents.data }   
        } catch (error) {
            if(error instanceof Error){
                return { val: false, erro: error.message}
            }
            return { val: false, erro: `Erro interno do servidor: ${error}`}
        }
    }
}