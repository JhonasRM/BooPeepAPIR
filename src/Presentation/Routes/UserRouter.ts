import { Router, Request, Response} from 'express';
import { CreateUserUC } from '../UseCases/Users/CreateUser/CreateUserUC';
import { CreateUserController } from '../UseCases/Users/CreateUser/CreateUserController';
import { LoginUserUC } from '../UseCases/Users/LoginUser/LoginUserUC';
import { LoginUserController } from '../UseCases/Users/LoginUser/LoginUserController';
import { UpdateUserController } from '../UseCases/Users/UpdateUser/UpdateUserController';
import { UpdateUserUC } from '../UseCases/Users/UpdateUser/UpdateUserUC';
import { DeleteUserUC } from '../UseCases/Users/DeleteUser/DeleteUserUC';
import { DeleteUserController } from '../UseCases/Users/DeleteUser/DeleteUserController';
import { ReadAllUsersUC } from '../UseCases/Users/ReadAllUsers/ReadAllUserUC';
import { ReadAllUsersController } from '../UseCases/Users/ReadAllUsers/ReadAllUserController';
import { ReadUserUC } from '../UseCases/Users/ReadUser/ReadUserUC';
import { ReadUserController } from '../UseCases/Users/ReadUser/ReadUserController';
import { ResetPwdUserUC } from '../UseCases/Users/ResetPwdUser/ResetPwdUserUC';
import { ResetPwdUserController } from '../UseCases/Users/ResetPwdUser/ResetPwdUserController';
import { UserFireStoreRepository } from '../../Service/Repositories/UsersFireStoreRepository';
import { UserAuthRepository } from '../../Service/Repositories/UsersAuthRepository';

const router: Router= Router();
const userARep = new UserAuthRepository()
const userFRep =  new UserFireStoreRepository()


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

//Login User
const loginUserUC: LoginUserUC = new LoginUserUC(userARep, userFRep)
const loginUserController: LoginUserController = new LoginUserController(loginUserUC)

router
    .route("/loginuser")
    .post((req: Request, res: Response) => loginUserController.handle(req, res))

// Reset Password 
const resetpwdUC: ResetPwdUserUC = new ResetPwdUserUC(userARep)
const resetpwdController: ResetPwdUserController = new ResetPwdUserController(resetpwdUC)

router
    .route("/resetpwd")
    .post((req: Request, res: Response) => resetpwdController.handle(req, res))
module.exports = router;
