import { Router, Request, Response} from 'express';
import {ChatRepository} from  '../../Service/Repositories/ChatRepository';
import { CreateChatUC } from '../UseCases/Chat/CreateChat/CreateChatUC';
import { ReadMessageUC } from '../UseCases/Chat/ReadMessage/ReadMessageUC';
import { ReadMessageController } from '../UseCases/Chat/ReadMessage/ReadMessageController';
import { UsersFireStoreRepository } from '../../Service/Repositories/UsersFireStoreRepository';
import { CreateChatController } from '../UseCases/Chat/CreateChat/CreateChatController';
import { CreateMessageUC } from '../UseCases/Chat/CreateMessage/CreateMessageUC';
import { CreateMessageController } from '../UseCases/Chat/CreateMessage/CreateMessageController';

const router: Router= Router();

const usersFireStoreRepository: UsersFireStoreRepository = new UsersFireStoreRepository()
const chatRepository: ChatRepository = new ChatRepository()

//Create Chat
const createChatUC: CreateChatUC = new CreateChatUC(chatRepository, usersFireStoreRepository)
const createChatController: CreateChatController = new CreateChatController(createChatUC)

//Read Message
const readMessageUC: ReadMessageUC = new ReadMessageUC(chatRepository)
const readChatController:ReadMessageController = new ReadMessageController(readMessageUC)

//Create Message
const createMessageUC: CreateMessageUC = new CreateMessageUC(chatRepository, usersFireStoreRepository)
const createMessageController: CreateMessageController = new CreateMessageController(createMessageUC)

router
    .route('/chat')
    .post((req: Request, res: Response) => createChatController.handle(req, res))
    .get((req: Request,  res: Response) => readChatController.handle(req, res))
    .put((req: Request,  res: Response) => createMessageController.handle(req, res))

module.exports = router;
