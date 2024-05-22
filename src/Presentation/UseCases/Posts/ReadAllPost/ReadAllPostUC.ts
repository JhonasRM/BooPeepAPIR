import { Post } from "../../../../Service/Model/Post"
import { PostRepository } from "../../../../Service/Repositories/PostRepository"


export class ReadAllPostUC {
    constructor(private postRepository: PostRepository){ }
    async execute(): Promise<{ valido: boolean; data?: Post[]; erro?: string }>{
        try {
            const getAllPosts = await this.postRepository.getAllPosts()
            if (getAllPosts.valido === false) {
                throw new Error(getAllPosts.erro)
            } 
            return { valido: true, data: getAllPosts.data }   
        } catch (error) {
            if(error instanceof Error){
                return { valido: false, erro: error.message}
            }
            return { valido: false, erro: `Internal Server Error: ${error}`}
        }
    }
}