import { Post } from "../../../Service/Model/Post";
import { PostRepository } from "../../../Service/Repositories/PostRepository";
import { UsersRepository } from "../../../Service/Repositories/UsersRepository";
import { ICreatePostRequestDTO } from "./CreatePostDTO";
export class CreatePostUC {
    constructor(private postRepository: PostRepository, private userRepository: UsersRepository) { }
    async execute(data: ICreatePostRequestDTO, email: string) {
        const user = await this.userRepository.findByEmail(email)

        if (user === null) {
            throw new Error('O Usuário não foi encontrado')
        } 
        const NewPost: Post = new Post(data,user)
        console.log('Criando Novo Post...')
        await this.postRepository.save(NewPost)
    }
}