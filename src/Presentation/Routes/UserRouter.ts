import { Router, Request, Response} from 'express';
import { CreateUserUC } from '../UseCases/CreateUser/CreateUserUC';
import { UsersRepository } from '../../Service/Repositories/UsersRepository';
import { CreateUserController } from '../UseCases/CreateUser/CreateUserController';
import { ReadAllUsersUC } from '../UseCases/ReadAllUsers/ReadAllUserUC';
import { ReadAllUsersController } from '../UseCases/ReadAllUsers/ReadAllUserController';
import { ReadUserUC } from '../UseCases/ReadUser/ReadUserUC';
import { ReadUserController } from '../UseCases/ReadUser/ReadUserController';

//Create User
const router: Router= Router();

const usersRepository: UsersRepository = new UsersRepository()
const createUserUC: CreateUserUC = new CreateUserUC(usersRepository)
const createUserController: CreateUserController = new CreateUserController(createUserUC)

//Read User
const readUserUC: ReadUserUC = new ReadUserUC(usersRepository)
const readUserController: ReadUserController = new ReadUserController(readUserUC)

router
    .route("/user")
    .post((req: Request ,res: Response) => createUserController.handle(req, res))
    .get((req: Request, res: Response) => readUserController.handle(req, res))

//Read All Users

const readAllUserUC: ReadAllUsersUC = new ReadAllUsersUC(usersRepository)
const readAllUsersContrller: ReadAllUsersController = new ReadAllUsersController(readAllUserUC)

router
    .route("/users")
    .get((req: Request ,res: Response) => readAllUsersContrller.handle(req, res))

// router
//     .route("/user")
//     .get((req: Request ,res: Response) => UserController.get(req, res))

//  router
//     .route("/user")
//     .delete((req: Request ,res: Response) => UserController.delete(req, res))

// router
//     .route("/user")
//     .put((req: Request, res: Response)=> UserController.update(req,res))
module.exports = router;
