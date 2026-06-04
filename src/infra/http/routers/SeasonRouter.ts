import { Router } from "express";
import { SeasonController } from "../controllers/SeasonController";
import { ValidationMiddleware } from "../middlewares/ValidationMiddleware";
import { idUUIDParamSchema } from "../../../shared/dtos";
import { createSeasonSchema, updateSeasonSchema } from "../../../shared/dtos/SeasonDto";
import { RouteDisplay } from "../../utils/RouteDisplay";


export class SeasonRouter {
    constructor(private seasonController: SeasonController) {}
    
    getRoutes = (): Router => {
        const seasonRouter = Router();

        seasonRouter.get(
            '/', 
            this.seasonController.index
        );

        seasonRouter.get(
            '/:id', 
            ValidationMiddleware.validate(idUUIDParamSchema, 'params'),
            this.seasonController.getOne
        );

        seasonRouter.post(
            '/', 
            ValidationMiddleware.validate(createSeasonSchema),
            this.seasonController.create
        );

        seasonRouter.patch(
            '/', 
            ValidationMiddleware.validate(updateSeasonSchema),
            this.seasonController.update
        );

        seasonRouter.delete(
            '/:id', 
            ValidationMiddleware.validate(idUUIDParamSchema, 'params'),
            this.seasonController.delete
        );

        RouteDisplay.scan(seasonRouter, "/api/season");

        return seasonRouter;
    }
}