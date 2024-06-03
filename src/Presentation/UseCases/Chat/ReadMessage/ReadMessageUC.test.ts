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
            chatID: "8d61971e-d7e4-49dc-bd0d-2d55c5dd9341",
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
            erro: "Este chat não existe", // Ajuste esta mensagem conforme o retorno real da sua função
        });
    });
});
