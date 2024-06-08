import { ChatRepository } from "../../../../Service/Repositories/ChatRepository";
import { UserFireStoreRepository } from "../../../../Service/Repositories/UserFireStoreRepository";
import { ICreateMessageRequestDTO } from "./CreateMessageDTO";
import { CreateMessageUC } from "./CreateMessageUC";

describe('Create chat on Real Time Database', () => {
    let createMessageUC: CreateMessageUC
    let userFireStore: UserFireStoreRepository
    let chatRepository: ChatRepository
  beforeAll(() => {
    chatRepository = new ChatRepository()
    userFireStore = new UserFireStoreRepository()
    createMessageUC = new CreateMessageUC(chatRepository, userFireStore)
  });

  test('Create chat with an existing User', async () => {
    const ChatReqData: ICreateMessageRequestDTO = {
        chatID: "8d61971e-d7e4-49dc-bd0d-2d55c5dd9341",
        uid: "AojZJpdXpf2why3SY2Ts",
        displayName: "Jonathan Dias",
        lastmsg: "Tranquilo?nn"
    }
    const newMessage = await createMessageUC.execute(ChatReqData)
    expect(newMessage).toEqual({
      val: true,
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
    expect(newMessage).toEqual({ val: false, erro: "Erro ao enviar a mensagem: O Usuário não foi encontrado"});
  })
  });
