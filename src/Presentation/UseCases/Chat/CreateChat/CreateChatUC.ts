
import { Chat} from "../../../../Service/Model/Chat";
import { UserOnFirestore } from "../../../../Service/Model/UserOnFireStore";
import { ChatRepository } from "../../../../Service/Repositories/ChatRepository";
import { UserFireStoreRepository } from "../../../../Service/Repositories/UserFireStoreRepository";
import { ICreateChatRequestDTO } from "./CreateChatDTO";
export class CreateChatUC {
     constructor(private chatRepository: ChatRepository, private usersFireStoreRepository: UserFireStoreRepository) { }
     async execute(data: ICreateChatRequestDTO): Promise<{valido: boolean, value?:  number, erro?: string, data?: Chat }> {
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
          if(setchat.valido === false){
            throw new Error(setchat.erro)  
          }
          const update = await this.usersFireStoreRepository.update(data.uid, 'chatID', NewChat.chatid)
          if(update.val === false){
            throw new Error('erro ao criar o chat para este usuário')
          }
          return {
            valido: true, value:201, data:setchat.value
          }
         } catch (error) {
          if(error instanceof Error){
            if(error.message === "O  chat já existe"){
                return { valido: false, value:401 , erro:error.message }
            }else if(error.message !== "o chat já existe"){
              return { valido: false, value:400 , erro: error.message }
            }
          }
          return{ valido: false, value:500, erro: `erro interno do servidor: ${error}` }
         }
    }
}