
import { IReturnAdapter } from "../../../../utils/Interfaces/IReturnAdapter";
import { Post } from "../../../../Service/Model/Post";
import { UserOnFirestore } from "../../../../Service/Model/UserOnFireStore";
import { PostRepository } from "../../../../Service/Repositories/PostRepository";
import { UserAuthRepository } from "../../../../Service/Repositories/UserAuthRepository";
import { UserFireStoreRepository } from "../../../../Service/Repositories/UserFireStoreRepository";
import { ICreateComentRequestDTO } from "./CreateComentDTO";
import { ComentRepository } from "../../../../Service/Repositories/ComentsRepository";
import { Coment } from "../../../../Service/Model/Coment";
export class CreateComentUC {
    constructor(private postRepository: PostRepository, private usersFireStoreRepository: UserFireStoreRepository, private  comentReposiroty: ComentRepository) { }
    async execute(data: ICreateComentRequestDTO): Promise<IReturnAdapter>{
        try {
            const userAuth = await this.usersFireStoreRepository.getUser(data.uid)
        if(userAuth.val === false){
            throw new Error('Usuário não encontrado')
        }
        const getPost = await this.postRepository.getPost(data.postID)   
        if(getPost.val === false){
            throw new Error(getPost.erro)
        } 
        const newComent = new Coment(data.postID, data.uid, data.text)
        const createComent = await this.comentReposiroty.createComent(newComent)
        if(createComent.val === false){
            throw new Error(createComent.erro)
        }
        return { val: true, data: createComent.data }
        } catch (error) {
            if(error instanceof Error){
                return { val: false, erro: error.message}
            }
            return { val: false, erro: `Erro interno do servidor: ${error}`}
        }
        
    }
}