
import { Post } from "../../../../Service/Model/Post";
import { UserOnFirestore } from "../../../../Service/Model/UserOnFireStore";
import { PostRepository } from "../../../../Service/Repositories/PostRepository";
import { UsersFireStoreRepository } from "../../../../Service/Repositories/UsersFireStoreRepository";
import { ICreatePostRequestDTO } from "./CreatePostDTO";
export class CreatePostUC {
    constructor(private postRepository: PostRepository, private usersFireStoreRepository: UsersFireStoreRepository) { }
    async execute(data: ICreatePostRequestDTO, email: string) {
        const user = await this.usersFireStoreRepository.findByEmail(email)

        if (user.valido === false) {
            throw new Error('O Usuário não foi encontrado')
        } 
        const userData = user.value as UserOnFirestore
        const NewPost: Post = new Post(data, userData)
        console.log('Criando Novo Post...')
        await this.postRepository.save(NewPost)
    }
}