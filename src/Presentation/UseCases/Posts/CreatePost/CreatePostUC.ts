import { Post } from "../../../../Service/Model/Post";
import { UserOnFirestore } from "../../../../Service/Model/UserOnFireStore";
import { PostRepository } from "../../../../Service/Repositories/PostRepository";
import { UsersAuthRepository } from "../../../../Service/Repositories/UsersAuthRepository";
import { UsersFireStoreRepository } from "../../../../Service/Repositories/UsersFireStoreRepository";
import { ICreatePostRequestDTO } from "./CreatePostDTO";
export class CreatePostUC {
    constructor(private postRepository: PostRepository, private usersFireStoreRepository: UsersFireStoreRepository, private usersAuthRepository: UsersAuthRepository) { }
    async execute(data: ICreatePostRequestDTO, email: string) {
        const userAuth = await this.usersAuthRepository.findByEmail(email)
        if(userAuth.valido === false){
            //implementar padrão de retorno
        }
        const uid = userAuth.value?.uid as string
        const user = await this.usersFireStoreRepository.findByUID(uid)

        if (user.valido === false) {
            throw new Error('O Usuário não foi encontrado')
        } 
        const userData = user.value as UserOnFirestore
        const NewPost: Post = new Post(data, userData)
        console.log('Criando Novo Post...')
        await this.postRepository.save(NewPost)
    }
}
