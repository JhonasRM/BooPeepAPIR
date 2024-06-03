import { IReturnAdapter } from "../../../../Service/Interfaces/IReturnAdapter";
import { Post } from "../../../../Service/Model/Post";
import { UserOnFirestore } from "../../../../Service/Model/UserOnFireStore";
import { PostRepository } from "../../../../Service/Repositories/PostRepository";
import { UsersAuthRepository } from "../../../../Service/Repositories/UsersAuthRepository";
import { UsersFireStoreRepository } from "../../../../Service/Repositories/UsersFireStoreRepository";
import { ICreatePostRequestDTO } from "./CreatePostDTO";
export class CreatePostUC {
    constructor(private postRepository: PostRepository, private usersFireStoreRepository: UsersFireStoreRepository, private usersAuthRepository: UsersAuthRepository) { }
    async execute(data: ICreatePostRequestDTO): Promise<IReturnAdapter>{
        try {
            const userExists = await this.usersFireStoreRepository.findByUID(data.UserID)
        if(userExists.valido === false){
            throw new Error('Usuário não encontrado')
        }
        const uid = userExists.value?.uid as string
        const NewPost: Post = new Post(data, uid)
        const createpost = await this.postRepository.save(NewPost)   
        if(createpost.val === false){
            throw new Error(createpost.erro)
        } 
        return { val: true, data: createpost.data }
        } catch (error) {
            if(error instanceof Error){
                return { val: false, erro: error.message}
            }
            return { val: false, erro: `Erro interno do servidor: ${error}`}
        }
        
    }
}
