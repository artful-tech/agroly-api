import { Router } from "express";
import { FarmController } from "../controllers/FarmController";
import { ValidationMiddleware } from "../middlewares/ValidationMiddleware";
import { createFarmSchema, updateFarmSchema } from "../../../shared/dtos/FarmDto";
import { RouteDisplay } from "../../utils/RouteDisplay";
import { idUUIDParamSchema } from "../../../shared/dtos";


export default class FarmRouter {
    constructor(private farmController: FarmController) {}

    getRoutes = (): Router => {
        const farmRouter = Router();

        farmRouter.get('/', this.farmController.index);

        farmRouter.get(
            '/:id', 
            ValidationMiddleware.validate(idUUIDParamSchema, 'params'),
            this.farmController.getOne
        );

        farmRouter.post(
            '/',
            ValidationMiddleware.validate(createFarmSchema),
            this.farmController.create
        );

        farmRouter.patch(
            '/',
            ValidationMiddleware.validate(updateFarmSchema),
            this.farmController.update
        );
        
        farmRouter.delete(
            '/:id',
            ValidationMiddleware.validate(idUUIDParamSchema, 'params'),
            this.farmController.delete
        );

        RouteDisplay.scan(farmRouter, "/api/farm");

        return farmRouter;
    }
}
