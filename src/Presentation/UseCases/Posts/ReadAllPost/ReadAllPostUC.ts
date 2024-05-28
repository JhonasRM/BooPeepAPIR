import { IReturnAdapter } from "../../../../utils/Interfaces/IReturnAdapter"
import { Post } from "../../../../Service/Model/Post"
import { PostRepository } from "../../../../Service/Repositories/PostRepository"


export class ReadAllPostUC {
    constructor(private postRepository: PostRepository){ }
    async execute(): Promise<IReturnAdapter>{
        try {
            const getAllPosts = await this.postRepository.getAllPosts()
            if (getAllPosts.val === false) {
                throw new Error(getAllPosts.erro)
            } 
            return { val: true, data: getAllPosts.data }   
        } catch (error) {
            if(error instanceof Error){
                return { val: false, erro: error.message}
            }
            return { val: false, erro: `Erro interno do servidor: ${error}`}
        }
    }
}