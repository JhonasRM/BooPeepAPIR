import { ChatRepository } from "../../../../Service/Repositories/ChatRepository";
import { UsersFireStoreRepository } from "../../../../Service/Repositories/UsersFireStoreRepository";
import { ICreateMessageRequestDTO } from "./CreateMessageDTO";
import { CreateMessageUC } from "./CreateMessageUC";

describe('Create chat on Real Time Database', () => {
    let createMessageUC: CreateMessageUC
    let userFireStore: UsersFireStoreRepository
    let chatRepository: ChatRepository
  beforeAll(() => {
    chatRepository = new ChatRepository()
    userFireStore = new UsersFireStoreRepository()
    createMessageUC = new CreateMessageUC(chatRepository, userFireStore)
  });

  test('Create chat with an existing User', async () => {
    const ChatReqData: ICreateMessageRequestDTO = {
        chatID: "c4a5c7eb-37e7-4472-bda3-15eb2b250dc3",
        uid: "AojZJpdXpf2why3SY2Ts",
        displayName: "Jonathan Dias",
        lastmsg: "Olá"
    }
    const newMessage = await createMessageUC.execute(ChatReqData)
    expect(newMessage).toEqual({
      valido: true,
      value: 201,
      data: newMessage.data
  })}, 50000)

  test('Create chat with an non existing user should return error', async () => {
    const ChatReqData: ICreateMessageRequestDTO = {
        chatID: "3",
        uid: "4",
        displayName: "Jonathan Dias",
        lastmsg: "oi"
    }
    const newMessage = await createMessageUC.execute(ChatReqData)
    expect(newMessage).toEqual({ valido: false, value: 400, erro: "Erro ao enviar a mensagem: O Usuário não foi encontrado"});
  })
  });
