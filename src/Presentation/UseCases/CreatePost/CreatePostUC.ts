import { Post } from "../../../Service/Model/Post";
import { PostRepository } from "../../../Service/Repositories/PostRepository";
import { ICreatePostRequestDTO } from "./CreateUserDTO";
export class CreatePostUC {
    constructor(private postRepository: PostRepository) { }
    async execute(data: ICreatePostRequestDTO) {
        const user = await this.postRepository.findUser(data.UserID)

        if (user === null) {
            throw new Error('O Usuário não foi encontrado')
        } 
        const NewPost: Post = new Post(data, user)
        console.log('Criando Novo Post...')
        await this.postRepository.save(NewPost)
    }
}