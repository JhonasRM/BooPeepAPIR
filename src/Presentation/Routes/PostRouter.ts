import { Router, Request, Response} from 'express';
import { PostRepository } from '../../Service/Repositories/PostRepository';
import { CreatePostUC } from '../UseCases/CreatePost/CreatePostUC';
import { CreatePostController } from '../UseCases/CreatePost/CreatePostController';
import { ReadPostUC } from '../UseCases/ReadPost/ReadPostUC';
import { ReadPostController } from '../UseCases/ReadPost/ReadPostController';
import { ReadAllPostUC } from '../UseCases/ReadAllPost/ReadAllPostUC';
import { ReadAllPostController } from '../UseCases/ReadAllPost/ReadAllPostController';
import { UpdatePostUC } from '../UseCases/UpdatePost/UpdatePostUC';
import { UpdatePostController } from '../UseCases/UpdatePost/UpdatePostController';
import { UsersRepository } from '../../Service/Repositories/UsersAuthRepository';
import { DeletePostUC } from '../UseCases/DeletePost/DeletePostUC';
import { DeletePostController } from '../UseCases/DeletePost/DeletePostController';


//Create Post
const router: Router= Router();

const userRepository: UsersRepository = new UsersRepository()
const postRepository: PostRepository = new PostRepository()
const createPostUC: CreatePostUC = new CreatePostUC(postRepository, userRepository)
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
