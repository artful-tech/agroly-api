import { Router } from "express";
import { PlotController } from "../controllers/PlotController";
import { RouteDisplay } from "../../utils/RouteDisplay";
import { ValidationMiddleware } from "../middlewares/ValidationMiddleware";
import { idUUIDParamSchema } from "../../../shared/dtos";
import { createPlotSchema, updatePlotSchema } from "../../../shared/dtos/PlotDto";


export default  class PlotRouter {
    constructor(private plotController: PlotController) {}

    getRoutes = (): Router => {
        const router = Router();

        router.get('/', this.plotController.index);

        router.get(
            '/:id',
            ValidationMiddleware.validate(idUUIDParamSchema, 'params'),
            this.plotController.getOne
        );
        
        router.post(
            '/',
            ValidationMiddleware.validate(createPlotSchema),
            this.plotController.create
        );
        
        router.patch(
            '/',
            ValidationMiddleware.validate(updatePlotSchema),
            this.plotController.update
        );
        
        router.delete(
            '/:id',
            ValidationMiddleware.validate(idUUIDParamSchema, 'params'),
            this.plotController.delete
        );

        RouteDisplay.scan(router, "/api/plot");

        return router;
    }
}