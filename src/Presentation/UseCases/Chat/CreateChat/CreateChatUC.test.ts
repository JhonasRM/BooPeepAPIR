import { ChatRepository } from "../../../../Service/Repositories/ChatRepository";
import { UserFireStoreRepository } from "../../../../Service/Repositories/UserFireStoreRepository";
import { ICreateChatRequestDTO } from "./CreateChatDTO";
import { CreateChatUC } from "./CreateChatUC";

describe('Create chat on Real Time Database', () => {
    let createChatUC: CreateChatUC
    let userFireStore: UserFireStoreRepository
    let chatRepository: ChatRepository
  beforeAll(() => {
    chatRepository = new ChatRepository()
    userFireStore = new UserFireStoreRepository()
    createChatUC = new CreateChatUC(chatRepository, userFireStore)
  });

  test('Create chat with an existing User', async () => {
    const ChatReqData: ICreateChatRequestDTO = {
         uid:"AojZJpdXpf2why3SY2Ts",
         }
    const newChat = await createChatUC.execute(ChatReqData)
    expect(newChat).toEqual({
      val: true,
      data: newChat.data
  })}, 7000)

  test('Create chat with an non existing user should return error', async () => {
    const ChatReqData: ICreateChatRequestDTO = {
        uid:"",
        }
    const newChat = await createChatUC.execute(ChatReqData)
    expect(newChat).toEqual({ val: false, erro: "Erro ao criar o chat: O Usuário não foi encontrado"});
  })
  });
