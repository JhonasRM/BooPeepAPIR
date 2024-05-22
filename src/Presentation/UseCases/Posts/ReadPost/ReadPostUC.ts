import { Post } from "../../../../Service/Model/Post";
import { PostRepository } from "../../../../Service/Repositories/PostRepository"
import { IReadPostRequestDTO } from "./ReadPostDTO"

export class ReadPostUC {
    constructor(private postRepository: PostRepository){ }
    async execute(data: IReadPostRequestDTO): Promise<{ valido: boolean; erro?: string | unknown, data?: Post }> { 
        try {
            const wantedpost = await this.postRepository.findByID(data.postId)
        if(wantedpost.valido === false){
            throw new Error(wantedpost.erro)
        }
        return { valido: true, data: wantedpost.data}
        } catch (error) {
            if(error instanceof Error){
                return { valido: false, erro: error.message}
            }
            return { valido: false, erro: `Internal Server Error: ${error}`}
        }
    }
}