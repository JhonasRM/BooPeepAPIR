import { IReturnAdapter } from "../../../../utils/Interfaces/IReturnAdapter";
import { Post } from "../../../../Service/Model/Post";
import { PostRepository } from "../../../../Service/Repositories/PostRepository"
import { IReadPostRequestDTO } from "./ReadPostDTO"

export class ReadPostUC {
    constructor(private postRepository: PostRepository){ }
    async execute(data: IReadPostRequestDTO): Promise<IReturnAdapter> { 
        try {
            const wantedpost = await this.postRepository.getPost(data.postId)
        if(wantedpost.val === false){
            throw new Error(wantedpost.erro)
        }
        return { val: true, data: wantedpost.data}
        } catch (error) {
            if(error instanceof Error){
                return { val: false, erro: error.message}
            }
            return { val: false, erro: `Erro interno do servidor: ${error}`}
        }
    }
}