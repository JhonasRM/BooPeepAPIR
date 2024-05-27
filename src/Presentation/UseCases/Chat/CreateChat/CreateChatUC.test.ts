import { ChatRepository } from "../../../../Service/Repositories/ChatRepository";
import { UsersFireStoreRepository } from "../../../../Service/Repositories/UsersFireStoreRepository";
import { ICreateChatRequestDTO } from "./CreateChatDTO";
import { CreateChatUC } from "./CreateChatUC";

describe('Create chat on Real Time Database', () => {
    let createChatUC: CreateChatUC
    let userFireStore: UsersFireStoreRepository
    let chatRepository: ChatRepository
  beforeAll(() => {
    chatRepository = new ChatRepository()
    userFireStore = new UsersFireStoreRepository()
    createChatUC = new CreateChatUC(chatRepository, userFireStore)
  });

  test('Create chat with an existing User', async () => {
    const ChatReqData: ICreateChatRequestDTO = {
         uid:"AojZJpdXpf2why3SY2Ts",
         }
    const newChat = await createChatUC.execute(ChatReqData)
    expect(newChat).toEqual({
      valido: true,
      value: 201,
      data: newChat.data
  })}, 5000)

  test('Create chat with an non existing user should return error', async () => {
    const ChatReqData: ICreateChatRequestDTO = {
        uid:"",
        }
    const newChat = await createChatUC.execute(ChatReqData)
    expect(newChat).toEqual({ valido: false, value: 400, erro: "Erro ao criar o chat: O Usuário não foi encontrado"});
  })
  });
