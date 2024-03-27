import { PostRepository } from "../../../Service/Repositories/PostRepository";
import { DeletePostRequestDTO } from "./DeletePostDTO";

export class deletePostUC{
    constructor( private postRepository: PostRepository){}
    async execute(deletePostDTO: DeletePostRequestDTO){
        const deletedPost = await this.postRepository.DeletePost(deletePostDTO.postID)
        return
    }
}