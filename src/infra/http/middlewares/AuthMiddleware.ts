import { Request, Response, NextFunction } from "express";
import { TokenService } from "../../services/TokenService";
import { AppError } from "../../../core/errors/AppError";

export class AuthMiddleware {
    constructor(private readonly tokenService: TokenService) { }

    /**
     * Middleware de autenticação que valida o token JWT.
     */
    public handle = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const cookieToken = req.cookies?.token;

        let token = cookieToken;

        if (!token) {
            throw new AppError("Você precisa estar logado para acessar essa rota", 401);
        }

        try {
            const userId = this.tokenService.validate(token);

            // 4. Injeta o ID do usuário na requisição para que os controllers saibam quem está logado
            (req as any).user = {
                id: userId
            };

            console.log((req as any).user);

            return next();
        } catch (error) {
            // O TokenService.validate já lança AppError 401 se falhar
            throw error;
        }
    }
}