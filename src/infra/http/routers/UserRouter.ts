import { Router } from "express";
import { UserController } from "../controllers/UserController";
import { ValidationMiddleware } from "../middlewares/ValidationMiddleware";
import { CreateUserSchema } from "../../../shared/dtos/UserDto";
import { RouteDisplay } from "../../utils/RouteDisplay";


export default class UserRouter {
    constructor(private userController: UserController) {}

    getRoutes = (): Router => {
        const userRouter = Router();

        userRouter.get('/', this.userController.index)
        userRouter.post('/', this.userController.getByEmail)
        userRouter.post(
            '/signup', 
            ValidationMiddleware.validate(CreateUserSchema),
            this.userController.create
        )
        
        RouteDisplay.scan(userRouter, "/api/user");
        
        return userRouter;
    }
}
