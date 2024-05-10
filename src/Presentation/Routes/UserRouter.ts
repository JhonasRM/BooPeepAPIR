import { Router, Request, Response} from 'express';
import { CreateUserUC } from '../UseCases/CreateUser/CreateUserUC';
import { CreateUserController } from '../UseCases/CreateUser/CreateUserController';
import { ReadAllUsersUC } from '../UseCases/ReadAllUsers/ReadAllUserUC';
import { ReadAllUsersController } from '../UseCases/ReadAllUsers/ReadAllUserController';
import { ReadUserUC } from '../UseCases/ReadUser/ReadUserUC';
import { ReadUserController } from '../UseCases/ReadUser/ReadUserController';
import { UpdateUserUC } from '../UseCases/UpdateUser/UpdateUserUC';
import { UpdateUserController } from '../UseCases/UpdateUser/UpdateUserController';
import { DeleteUserUC } from '../UseCases/DeleteUser/DeleteUserUC';
import { DeleteUserController } from '../UseCases/DeleteUser/DeleteUserController';
import { UsersAuthRepository } from '../../Service/Repositories/UsersAuthRepository';
import { UsersFireStoreRepository } from '../../Service/Repositories/UsersFireStoreRepository';

const router: Router= Router();
const userARep = new UsersAuthRepository()
const userFRep =  new UsersFireStoreRepository()


//Create User

const createUserUC: CreateUserUC = new CreateUserUC(userARep, userFRep)
const createUserController: CreateUserController = new CreateUserController(createUserUC)

//Read User
const readUserUC: ReadUserUC = new ReadUserUC(userARep, userFRep)
const readUserController: ReadUserController = new ReadUserController(readUserUC)

//UpdateUser

const updateUserUC: UpdateUserUC = new UpdateUserUC(userARep, userFRep)
const updateUserController: UpdateUserController = new UpdateUserController(updateUserUC)

//Delete User

const deleteUserUC: DeleteUserUC = new DeleteUserUC(userARep, userFRep)
const deleteUserController: DeleteUserController = new DeleteUserController(deleteUserUC)


router
    .route("/user")
    .post((req: Request ,res: Response) => createUserController.handle(req, res))
    .get((req: Request, res: Response) => readUserController.handle(req, res))
    .put((req: Request, res: Response)=> updateUserController.handle(req,res))
    .delete((req: Request ,res: Response) => deleteUserController.handle(req, res))

//Read All Users

const readAllUserUC: ReadAllUsersUC = new ReadAllUsersUC(userARep, userFRep)
const readAllUsersContrller: ReadAllUsersController = new ReadAllUsersController(readAllUserUC)

router
    .route("/users")
    .get((req: Request ,res: Response) => readAllUsersContrller.handle(req, res))
    
module.exports = router;
