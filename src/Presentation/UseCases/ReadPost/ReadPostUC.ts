import { PostRepository } from "../../../Service/Repositories/PostRepository"
import { IReadPostRequestDTO } from "./ReadPostDTO"

export class ReadPostUC {
    constructor(private postRepository: PostRepository) { }
    async execute(data: IReadPostRequestDTO) {
        const wantedpost = await this.postRepository.findByID(data.id)
        if (wantedpost === null) {
            throw new Error('Este usuário não existe')
        } 
        return wantedpost
        
    }
}