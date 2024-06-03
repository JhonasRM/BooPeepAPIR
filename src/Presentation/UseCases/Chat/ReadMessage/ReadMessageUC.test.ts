import { ChatRepository } from "../../../../Service/Repositories/ChatRepository";
import { IReadMessageRequestDTO } from "./ReadMessageDTO";
import { ReadMessageUC } from "./ReadMessageUC";

describe('Read messages from Real Time Database', () => {
    let readMessageUC: ReadMessageUC;
    let chatRepository: ChatRepository;

    beforeAll(() => {
        chatRepository = new ChatRepository();
        readMessageUC = new ReadMessageUC(chatRepository);
    });

    test('Read messages from an existing chat', async () => {
        const ChatReqData: IReadMessageRequestDTO = {
            chatID: "c4a5c7eb-37e7-4472-bda3-15eb2b250dc3",
        };

        const Messages = await readMessageUC.execute(ChatReqData);
        console.log(Messages.value)
        expect(Messages).toEqual({
            valido: true,
            value: expect.any(Array),
        });
    }, 50000);

    test('Read messages from a non-existing chat should return error', async () => {
        const ChatReqData: IReadMessageRequestDTO = {
            chatID: "0970,gjhj90",
        };

        const Messages = await readMessageUC.execute(ChatReqData);

        expect(Messages).toEqual({
            valido: false,
            erro: "A leitura falhou: O Usuário não foi encontrado", // Ajuste esta mensagem conforme o retorno real da sua função
        });
    });
});
