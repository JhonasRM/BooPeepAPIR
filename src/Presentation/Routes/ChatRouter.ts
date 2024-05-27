import { Router, Request, Response} from 'express';
import {ChatRepository} from  '../../Service/Repositories/ChatRepository';
import { CreateChatUC } from '../UseCases/Chat/CreateChat/CreateChatUC';
import { ReadMessageUC } from '../UseCases/Chat/ReadMessage/ReadMessageUC';
import { ReadMessageController } from '../UseCases/Chat/ReadMessage/ReadMessageController';
import { CreateMessageUC } from '../UseCases/Chat/CreateMessage/CreateMessageUC';
import { CreateMessageController } from '../UseCases/Message/CreateMessage/CreateMessageController';
import { UsersFireStoreRepository } from '../../Service/Repositories/UsersFireStoreRepository';
import { UsersAuthRepository } from '../../Service/Repositories/UsersAuthRepository';

//Create Chat
const router: Router= Router();

const usersAuthRepository: UsersAuthRepository = new UsersAuthRepository()
const usersFireStoreRepository: UsersFireStoreRepository = new UsersFireStoreRepository()
const chatRepository: ChatRepository = new ChatRepository()
const createChatUC: CreateChatUC = new CreateChatUC(chatRepository, usersFireStoreRepository, usersAuthRepository)
const createChatController: CreateChatController = new CreateChatController(createChatUC)

//Read Message
const readChatUC: ReadChatUC = new ReadChatUC(chatRepository)
const readChatController:ReadChatController = new ReadChatController(readChattUC)