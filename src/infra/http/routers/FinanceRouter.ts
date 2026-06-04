import { Router } from "express";
import { FinanceController } from "../controllers/FinanceController";
import { RouteDisplay } from "../../utils/RouteDisplay";


export default class FinanceRouter {
    constructor(private financeController: FinanceController) {}

    getRoutes = (): Router => {
        const financeRouter = Router();

        financeRouter.get('/:userId', this.financeController.index);

        RouteDisplay.scan(financeRouter, "/api/finance");

        return financeRouter;
    }
}