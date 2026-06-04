import { Router } from "express";
import { IAuthController } from "../controllers/interfaces";
import { ValidationMiddleware } from "../middlewares/ValidationMiddleware";
import { RouteDisplay } from "../../utils/RouteDisplay";
import { signinSchema } from "../../../shared/dtos/AuthDto";
import { CreateUserSchema } from "../../../shared/dtos/UserDto";

export class AuthRouter {
    constructor(private authController: IAuthController) { }
    
    getRoutes = (): Router => {
        const authRouter = Router();

        authRouter.post(
            '/signin',
            ValidationMiddleware.validate(signinSchema),
            this.authController.signin
        );
        
        authRouter.post(
            '/signup',
            ValidationMiddleware.validate(CreateUserSchema),
            this.authController.signup
        );

        RouteDisplay.scan(authRouter, "/api/auth");

        return authRouter;
    }
}