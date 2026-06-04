import path from 'node:path';
import { PrismaClient } from "@prisma/client";
import { NextFunction, Router, Request, Response } from "express";
import { ErrorMiddleware } from '../middlewares/ErrorMiddleware';
import { Factories } from '../../factories';
import { AuthMiddleware } from '../middlewares/AuthMiddleware';
import { TokenService } from '../../services/TokenService';


export class Routers {
    private factory;

    constructor(private prisma: PrismaClient) {
        this.factory = new Factories(this.prisma);
    }

    private initApiRoutes = (): Router => {
        const apiRouter = Router();
        
        
        apiRouter.use("/user", this.factory.makeUserRouter().getRoutes());
        apiRouter.use("/crop", this.factory.makeCropRouter().getRoutes());
        apiRouter.use("/farm", this.factory.makeFarmRouter().getRoutes());
        apiRouter.use("/plot", this.factory.makePlotRouter().getRoutes());
        apiRouter.use("/field-log", this.factory.makeFieldLogRouter().getRoutes());
        apiRouter.use("/finance", this.factory.makeFinanceRouter().getRoutes())
        apiRouter.use("/people", this.factory.makePeopleRouter().getRoutes())
        apiRouter.use("/season", this.factory.makeSeasonRouter().getRoutes())
        apiRouter.use("/inventory-item", this.factory.makeInventoryItemRouter().getRoutes())
        
        return apiRouter;
    }

    public getRouter = (): Router => {
        const root = Router();
        const authMiddleware = new AuthMiddleware(new TokenService());
        
        root.use("/api/auth", this.factory.makeAuthRouter().getRoutes())
        
        root.use("/api", authMiddleware.handle, this.initApiRoutes());
        
        root.get("/", (req: Request, res: Response, next: NextFunction) => {
            res.sendFile(path.resolve(__dirname, '../../../views/pages/front-end-example.html'));
        });

        root.use(ErrorMiddleware.notFoundHandler);
        root.use(ErrorMiddleware.errorHandler);

        return root;
    }
}