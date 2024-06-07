import { Router, Request, Response} from 'express';
import { PostRepository } from '../../Service/Repositories/PostRepository';
import { CreatePostController } from '../UseCases/Posts/CreatePost/CreatePostController';
import { CreatePostUC } from '../UseCases/Posts/CreatePost/CreatePostUC';
import { ReadPostUC } from '../UseCases/Posts/ReadPost/ReadPostUC';
import { ReadPostController } from '../UseCases/Posts/ReadPost/ReadPostController';
import { UpdatePostUC } from '../UseCases/Posts/UpdatePost/UpdatePostUC';
import { UpdatePostController } from '../UseCases/Posts/UpdatePost/UpdatePostController';
import { DeletePostUC } from '../UseCases/Posts/DeletePost/DeletePostUC';
import { DeletePostController } from '../UseCases/Posts/DeletePost/DeletePostController';
import { ReadAllPostController } from '../UseCases/Posts/ReadAllPost/ReadAllPostController';
import { ReadAllPostUC } from '../UseCases/Posts/ReadAllPost/ReadAllPostUC';
import { UserFireStoreRepository } from '../../Service/Repositories/UserFireStoreRepository';
import { UserAuthRepository } from '../../Service/Repositories/UserAuthRepository';

//Create Post
const router: Router= Router();

const userAuthRepository: UserAuthRepository = new UserAuthRepository()
const userFireStoreRepository: UserFireStoreRepository = new UserFireStoreRepository()
const postRepository: PostRepository = new PostRepository()
const createPostUC: CreatePostUC = new CreatePostUC(postRepository, userFireStoreRepository, userAuthRepository)
const createPostController: CreatePostController = new CreatePostController(createPostUC)

//Read Post
const readPostUC: ReadPostUC = new ReadPostUC(postRepository)
const readPostController:ReadPostController = new ReadPostController(readPostUC)

//Update Post

const updatePostUC: UpdatePostUC = new UpdatePostUC(postRepository)
const updatePostController: UpdatePostController = new UpdatePostController(updatePostUC)

const deletePostUC: DeletePostUC = new DeletePostUC(postRepository)
const deletePostController: DeletePostController = new DeletePostController(deletePostUC)

router
    .route("/post")
    .post((req: Request ,res: Response) => createPostController.handle(req, res))
    .get((req: Request, res: Response) => readPostController.handle(req, res))
    .put((req: Request, res: Response)=> updatePostController.handle(req,res))
    .delete((req: Request ,res: Response) => deletePostController.handle(req, res))

//Read All Users

const readAllPostUC: ReadAllPostUC = new ReadAllPostUC(postRepository)
const readAllPostController: ReadAllPostController = new ReadAllPostController(readAllPostUC)

router
    .route("/posts")
    .get((req: Request ,res: Response) => readAllPostController.handle(req, res))

module.exports = router;
