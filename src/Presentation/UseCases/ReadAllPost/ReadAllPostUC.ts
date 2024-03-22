import { Post } from "../../../Service/Model/Post"
import { PostRepository } from "../../../Service/Repositories/PostRepository"

export class ReadAllPostUC {
    constructor(private postRepository: PostRepository) { }
    async execute() {
        const Posts: Post[] | null = await this.postRepository.getAllPosts()
        if (Posts === null) {
            throw new Error('Erro ao buscar os usuários')
        } 
        return Posts
    }
}