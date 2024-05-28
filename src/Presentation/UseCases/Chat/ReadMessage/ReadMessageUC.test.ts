import { ChatRepository } from "../../../../Service/Repositories/ChatRepository";
import { UsersFireStoreRepository } from "../../../../Service/Repositories/UsersFireStoreRepository";
import { IReadMessageRequestDTO } from "./ReadMessageDTO";
import { ReadMessageUC } from "./ReadMessageUC";


describe('Create chat on Real Time Database', () => {
    let readMessageUC: ReadMessageUC
    let chatRepository: ChatRepository
  beforeAll(() => {
    chatRepository = new ChatRepository()
    readMessageUC = new ReadMessageUC(chatRepository)
  });

  test('Create chat with an existing User', async () => {
    const ChatReqData: IReadMessageRequestDTO = {
        chatID: "c4a5c7eb-37e7-4472-bda3-15eb2b250dc3",
      
    }
    const Messages = await readMessageUC.execute(ChatReqData)
    expect(Messages).toEqual({
      valido: true,
      value: 201,
      data: Messages.value
  })}, 50000)

  test('Create chat with an non existing user should return error', async () => {
    const ChatReqData: IReadMessageRequestDTO = {
        chatID: "097090",
    }
    const Messages = await readMessageUC.execute(ChatReqData)
    expect(Messages).toEqual({ valido: false, value: 400, erro: "Erro ao enviar a mensagem: O Usuário não foi encontrado"});
  })
  });
