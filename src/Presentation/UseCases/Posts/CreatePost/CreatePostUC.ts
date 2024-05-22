
import { Post } from "../../../../Service/Model/Post";
import { UserOnFirestore } from "../../../../Service/Model/UserOnFireStore";
import { PostRepository } from "../../../../Service/Repositories/PostRepository";
import { UsersAuthRepository } from "../../../../Service/Repositories/UsersAuthRepository";
import { UsersFireStoreRepository } from "../../../../Service/Repositories/UsersFireStoreRepository";
import { ICreatePostRequestDTO } from "./CreatePostDTO";
export class CreatePostUC {
    constructor(private postRepository: PostRepository, private usersFireStoreRepository: UsersFireStoreRepository, private usersAuthRepository: UsersAuthRepository) { }
    async execute(data: ICreatePostRequestDTO, email: string): Promise<{ valido: boolean; erro?: string | unknown, data?: string }>{
        try {
            const userAuth = await this.usersAuthRepository.findByEmail(email)
        if(userAuth.valido === false){
            throw new Error('Usuário não encontrado')
        }
        const uid = userAuth.value?.uid as string
        const NewPost: Post = new Post(data, uid)
        const createpost = await this.postRepository.save(NewPost)   
        if(createpost.valido === false){
            throw new Error(createpost.erro)
        } 
        return { valido: true, data: createpost.data }
        } catch (error) {
            if(error instanceof Error){
                return { valido: false, erro: error.message}
            }
            return { valido: false, erro: error}
        }
        
    }
}