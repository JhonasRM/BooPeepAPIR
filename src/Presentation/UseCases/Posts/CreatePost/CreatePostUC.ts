
import { IReturnAdapter } from "../../../../utils/Interfaces/IReturnAdapter";
import { Post } from "../../../../Service/Model/Post";
import { UserOnFirestore } from "../../../../Service/Model/UserOnFireStore";
import { PostRepository } from "../../../../Service/Repositories/PostRepository";
import { ICreatePostRequestDTO } from "./CreatePostDTO";
import { UserAuthRepository } from "../../../../Service/Repositories/UserAuthRepository";
import { UserFireStoreRepository } from "../../../../Service/Repositories/UserFireStoreRepository";
export class CreatePostUC {
    constructor(private postRepository: PostRepository, private usersFireStoreRepository: UserFireStoreRepository, private usersAuthRepository: UserAuthRepository) { }
    async execute(data: ICreatePostRequestDTO): Promise<IReturnAdapter>{
        try {
            const userAuth = await this.usersFireStoreRepository.getUser(data.UserID)
        if(userAuth.val === false){
            throw new Error('Usuário não encontrado')
        }
        const NewPost: Post = new Post(data, data.UserID)
        const createpost = await this.postRepository.createPost(NewPost)   
        if(createpost.val === false){
            throw new Error(createpost.erro)
        } 
        console.log(createpost.data)
        const updateUser = await this.usersFireStoreRepository.update(NewPost.UserID, 'postsID', createpost.data)
        if(updateUser.val === false){
            throw new Error(updateUser.erro)
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