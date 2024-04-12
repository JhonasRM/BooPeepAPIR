import { PostRepository } from "../../../Service/Repositories/PostRepository"
import { IReadPostRequestDTO } from "./ReadPostDTO"

export class ReadPostUC {
    constructor(private postRepository: PostRepository) { }
    async execute(data: IReadPostRequestDTO) {
        const wantedpost = await this.postRepository.findByID(data.postId)
        if (wantedpost === null) {
            throw new Error('Esta postagem não existe')
        } 
        return wantedpost
        
    }
}