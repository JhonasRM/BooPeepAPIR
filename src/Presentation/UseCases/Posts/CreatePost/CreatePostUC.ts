
import { IReturnAdapter } from "../../../../utils/Interfaces/IReturnAdapter";
import { Post } from "../../../../Service/Model/Post";
import { UserOnFirestore } from "../../../../Service/Model/UserOnFireStore";
import { PostRepository } from "../../../../Service/Repositories/PostRepository";
import { ICreatePostRequestDTO } from "./CreatePostDTO";
import { UserAuthRepository } from "../../../../Service/Repositories/UsersAuthRepository";
import { UserFireStoreRepository } from "../../../../Service/Repositories/UsersFireStoreRepository";
export class CreatePostUC {
    constructor(private postRepository: PostRepository, private usersFireStoreRepository: UserFireStoreRepository, private usersAuthRepository: UserAuthRepository) { }
    async execute(data: ICreatePostRequestDTO, email: string): Promise<IReturnAdapter>{
        try {
            const userAuth = await this.usersAuthRepository.getUser(email)
        if(userAuth.val === false){
            throw new Error('Usuário não encontrado')
        }
        const uid = userAuth.data?.uid as string
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