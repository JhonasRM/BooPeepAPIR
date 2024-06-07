
import { Chat} from "../../../../Service/Model/Chat";
import { UserOnFirestore } from "../../../../Service/Model/UserOnFireStore";
import { ChatRepository } from "../../../../Service/Repositories/ChatRepository";
import { UserFireStoreRepository } from "../../../../Service/Repositories/UserFireStoreRepository";
import { IReturnAdapter } from "../../../../utils/Interfaces/IReturnAdapter";
import { ICreateChatRequestDTO } from "./CreateChatDTO";
export class CreateChatUC {
     constructor(private chatRepository: ChatRepository, private usersFireStoreRepository: UserFireStoreRepository) { }
     async execute(data: ICreateChatRequestDTO): Promise<IReturnAdapter> {
         try {
          const user = await this.usersFireStoreRepository.getUser(data.uid)
          if (user.val === false) {
              throw new Error('O Usuário não foi encontrado')
          } 
          const userData = user.data as UserOnFirestore
          const uid = userData.uid
          const field = 'chatID'
          if(field in userData){
           throw new Error ("O chat já existe")
        }
          const NewChat: Chat = new Chat( uid as string)
          console.log('Criando Novo Chat...')
          const setchat = await this.chatRepository.setChat(NewChat)
          if(setchat.val === false){
            throw new Error(setchat.erro)  
          }
          const update = await this.usersFireStoreRepository.update(data.uid, 'chatID', NewChat.chatid)
          if(update.val === false){
            throw new Error('erro ao criar o chat para este usuário')
          }
          return {
            val: true, data:setchat.data
          }
         } catch (error) {
          if(error instanceof Error){
            if(error.message === "O  chat já existe"){
                return { val: false, erro:error.message }
            }else if(error.message !== "o chat já existe"){
              return { val: false, erro: error.message }
            }
          }
          return{ val: false,erro: `erro interno do servidor: ${error}` }
         }
    }
}