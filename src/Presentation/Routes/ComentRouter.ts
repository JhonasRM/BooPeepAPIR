import { Router, Request, Response} from 'express';
import { PostRepository } from '../../Service/Repositories/PostRepository';
import { UserFireStoreRepository } from '../../Service/Repositories/UserFireStoreRepository';
import { UserAuthRepository } from '../../Service/Repositories/UserAuthRepository';
import { CreateComentUC } from '../UseCases/Coments/CreateComent/CreateComentUC';
import { CreateComentController } from '../UseCases/Coments/CreateComent/CreateComentController';
import { ReadComentsUC } from '../UseCases/Coments/ReadComents/ReadComentUC';
import { ReadComentsController } from '../UseCases/Coments/ReadComents/ReadComentsController';
import { UpdateComentUC } from '../UseCases/Coments/UpdateComent/UpdateComentUC';
import { UpdateComentController } from '../UseCases/Coments/UpdateComent/UpdateComentController';
import { DeleteComentUC } from '../UseCases/Coments/DeleteComent/DeleteComentUC';
import { DeleteComentController } from '../UseCases/Coments/DeleteComent/DeleteComentController';
import { ComentRepository } from '../../Service/Repositories/ComentsRepository';

//Create Post
const router: Router= Router();
const comentRepository: ComentRepository = new ComentRepository()
const userAuthRepository: UserAuthRepository = new UserAuthRepository()
const userFireStoreRepository: UserFireStoreRepository = new UserFireStoreRepository()
const postRepository: PostRepository = new PostRepository()
const createComentUC: CreateComentUC = new CreateComentUC(postRepository, userFireStoreRepository, comentRepository)
const createComentController: CreateComentController = new CreateComentController(createComentUC)

//Read Post
const readComentUC: ReadComentsUC = new ReadComentsUC(postRepository, comentRepository)
const readComentController:ReadComentsController = new ReadComentsController(readComentUC)

//Update Post

const updateComentUC: UpdateComentUC = new UpdateComentUC(postRepository, comentRepository)
const updateComentController: UpdateComentController = new UpdateComentController(updateComentUC)

const deleteComentUC: DeleteComentUC = new DeleteComentUC(postRepository, comentRepository)
const deleteComentController: DeleteComentController = new DeleteComentController(deleteComentUC)

router
    .route("/coment")
    .post((req: Request ,res: Response) => createComentController.handle(req, res))
    .get((req: Request, res: Response) => readComentController.handle(req, res))
    .put((req: Request, res: Response)=> updateComentController.handle(req,res))
    .delete((req: Request ,res: Response) => deleteComentController.handle(req, res))

module.exports = router;
