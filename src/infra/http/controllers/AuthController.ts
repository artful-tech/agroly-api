import { Request, Response } from "express";
import { IAuthUsecase } from "../../../core/usecases/interfaces";
import { SigninDto } from "../../../shared/dtos/AuthDto";
import { IAuthController } from "./interfaces";
import { UserDtoCreate } from "../../../shared/dtos/UserDto";

export class AuthController implements IAuthController {
    constructor(private readonly authUsecase: IAuthUsecase) { }

    public signin = async (req: Request, res: Response): Promise<Response> => {
        const { email, password }: SigninDto = req.body;

        const token = await this.authUsecase.signin(email, password);

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 24 * 60 * 60 * 1000
        })

        return res.status(200).json({
            message: "Login realizado com sucesso",
            token
        });
    }

    public signup = async (req: Request, res: Response): Promise<Response> => {
        const userDto: UserDtoCreate = req.body;
        const id: string = await this.authUsecase.signup(userDto);

        res.setHeader('x-resource-id', id);
        res.setHeader('Location', `/api/user/${id}`);

        return res.status(201).send();
    }
}