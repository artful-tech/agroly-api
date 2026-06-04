import { Request, Response, NextFunction } from "express";
import { AppError } from "../../../core/errors/AppError";
import { ZodError } from "zod/v4";
import { handlePrismaError } from "../../../shared/errors/prismaErrorHandler";
import { Prisma } from "@prisma/client";


export class ErrorMiddleware {

    public static notFoundHandler(req: Request, res: Response) {
        res.status(404).json({
            status: "404 Error",
            message: `Endpoint ${req.originalUrl} não encontrado`
        });
    }

    public static errorHandler(
        error: Error,
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        // Se for um erro conhecido da nossa aplicação (AppError)
        if (error instanceof AppError) {
            return res.status(error.statusCode).json({
                status: error.status,
                message: error.message,
            });
        }

        if (error instanceof ZodError) {
            return res.status(400).json({
                status: "erro_de_validacao",
                message: "Dados inválidos",
                errors: error.issues.map(issue => ({
                    fields: issue.path,
                    message: issue.message
                }))
            });
        }

        // Erro de validação do Prisma (ex: campo único violado)
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            const { status, message } = handlePrismaError(error);

            return res.status(status).json({
                status: "error",
                message: message,
                code: error.code
            });
        }

        // Logar erro inesperado para o time debugar (Cloud Run Logs)
        console.error(`[Internal Error]: ${error.stack}`);

        return res.status(500).json({
            status: "error",
            message: "Erro interno do servidor",
        });
    }
}