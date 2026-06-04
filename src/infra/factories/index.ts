import { PrismaClient } from "@prisma/client";
import CropRouter from "../http/routers/CropRouter";
import { CropRepository } from "../../core/repositories/CropRepository";
import { CropController } from "../http/controllers/CropController";
import { CropUsecase } from "../../core/usecases/CropUsecase";
import { FarmRepository } from "../../core/repositories/FarmRepository";
import FarmRouter from "../http/routers/FarmRouter";
import { FarmUsecase } from "../../core/usecases/FarmUsecase";
import { FarmController } from "../http/controllers/FarmController";
import { FieldLogRouter } from "../http/routers/FieldLogRouter";
import { FieldLogRepository } from "../../core/repositories/FieldLogRepository";
import { FieldLogUsecase } from "../../core/usecases/FieldLogUsecase";
import { FieldLogController } from "../http/controllers/FieldLogController";
import FinanceRouter from "../http/routers/FinanceRouter";
import { FinanceRepository } from "../../core/repositories/FinanceRepository";
import { FinanceUsecase } from "../../core/usecases/FinanceUsecase";
import { FinanceController } from "../http/controllers/FinanceController";
import { PlotRepository } from "../../core/repositories/PlotRepository";
import PlotRouter from "../http/routers/PlotRouter";
import { PlotUsecase } from "../../core/usecases/PlotUsecase";
import { PlotController } from "../http/controllers/PlotController";
import UserRouter from "../http/routers/UserRouter";
import { UserRepository } from "../../core/repositories/UserRepository";
import { UserUsecase } from "../../core/usecases/UserUsecase";
import { UserController } from "../http/controllers/UserController";
import PeopleRouter from "../http/routers/PeopleRouter";
import { PeopleRepository } from "../../core/repositories/PeopleRepository";
import { PeopleUsecase } from "../../core/usecases/PeopleUsecase";
import { PeopleController } from "../http/controllers/PeopleController";
import { SeasonRouter } from "../http/routers/SeasonRouter";
import { SeasonRepository } from "../../core/repositories/SeasonRepository";
import { SeasonUsecase } from "../../core/usecases/SeasonUsecase";
import { SeasonController } from "../http/controllers/SeasonController";
import { InventoryItemRepository } from "../../core/repositories/InventoryItemRepository";
import { InventoryItemUsecase } from "../../core/usecases/InventoryItemUsecase";
import { InventoryItemController } from "../http/controllers/InventoryItemController";
import { InventoryItemRouter } from "../http/routers/InventoryItemRouter";
import { AuthRouter } from "../http/routers/AuthRouter";
import { AuthUsecase } from "../../core/usecases/AuthUsecase";
import { HashService } from "../services/HashService";
import { TokenService } from "../services/TokenService";
import { AuthController } from "../http/controllers/AuthController";


export class Factories {
    constructor(private prisma: PrismaClient) { }

    makeCropRouter(): CropRouter {
        const repository = new CropRepository(this.prisma);
        const usecase = new CropUsecase(repository);
        const controller = new CropController(usecase);
        return new CropRouter(controller);
    }

    makeFarmRouter(): FarmRouter {
        const repository = new FarmRepository(this.prisma);
        const usecase = new FarmUsecase(repository);
        const controller = new FarmController(usecase);
        return new FarmRouter(controller);
    }

    makeFieldLogRouter(): FieldLogRouter {
        const repository = new FieldLogRepository(this.prisma);
        const usecase = new FieldLogUsecase(repository);
        const controller = new FieldLogController(usecase);
        return new FieldLogRouter(controller);
    }

    makeFinanceRouter(): FinanceRouter {
        const repository = new FinanceRepository(this.prisma);
        const usecase = new FinanceUsecase(repository);
        const controller = new FinanceController(usecase);
        return new FinanceRouter(controller);
    }

    makePlotRouter(): PlotRouter {
        const repository = new PlotRepository(this.prisma);
        const usecase = new PlotUsecase(repository);
        const controller = new PlotController(usecase);
        return new PlotRouter(controller);
    }

    makeUserRouter(): UserRouter {
        const repository = new UserRepository(this.prisma);
        const usecase = new UserUsecase(repository);
        const controller = new UserController(usecase);
        return new UserRouter(controller);
    }

    makePeopleRouter(): PeopleRouter {
        const repository = new PeopleRepository(this.prisma);
        const usecase = new PeopleUsecase(repository);
        const controller = new PeopleController(usecase);
        return new PeopleRouter(controller);
    }

    makeSeasonRouter(): SeasonRouter {
        const repository = new SeasonRepository(this.prisma);
        const usecase = new SeasonUsecase(repository);
        const controller = new SeasonController(usecase);
        return new SeasonRouter(controller);
    }
    
    makeInventoryItemRouter(): InventoryItemRouter {
        const repository = new InventoryItemRepository(this.prisma);
        const usecase = new InventoryItemUsecase(repository);
        const controller = new InventoryItemController(usecase);
        return new InventoryItemRouter(controller);
    }

    makeAuthRouter(): AuthRouter {
        const repository = new UserRepository(this.prisma);
        const usecase = new AuthUsecase(repository, new HashService(), new TokenService());
        const controller = new AuthController(usecase);
        return new AuthRouter(controller);
    }
}
