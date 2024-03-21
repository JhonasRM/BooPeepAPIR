import { Router, Request, Response } from 'express';
import { UserController } from "../Controller/UserController";

const router: Router= Router();

router
    .route("/user")
    .post((req: Request ,res: Response) => UserController.create(req, res))

router
    .route("/users")
    .get((req: Request ,res: Response) => UserController.getAll(req, res))
    
router
    .route("/user")
    .get((req: Request ,res: Response) => UserController.get(req, res))

 router
    .route("/user")
    .delete((req: Request ,res: Response) => UserController.delete(req, res))

router
    .route("/user")
    .put((req: Request, res: Response)=> UserController.update(req,res))
module.exports = router;
