import { Router } from "express";
import { ICropController } from "../controllers/interfaces";
import { ValidationMiddleware } from "../middlewares/ValidationMiddleware";
import { createCropSchema, updateCropSchema } from "../../../shared/dtos/CropDto";
import { RouteDisplay } from "../../utils/RouteDisplay";
import { idUUIDParamSchema } from "../../../shared/dtos";


export default class CropRouter {
    constructor(private cropController: ICropController) { }

    getRoutes = (): Router => {
        const cropRouter = Router();

        cropRouter.get(
            '/',
            this.cropController.index
        );
        
        cropRouter.get(
            '/:id',
            ValidationMiddleware.validate(idUUIDParamSchema, 'params'),
            this.cropController.getOne
        );

        cropRouter.post(
            '/',
            ValidationMiddleware.validate(createCropSchema),
            this.cropController.create
        );
        
        cropRouter.patch(
            '/',
            ValidationMiddleware.validate(updateCropSchema),
            this.cropController.update
        );
        
        cropRouter.delete(
            '/:id',
            ValidationMiddleware.validate(idUUIDParamSchema, 'params'),
            this.cropController.delete
        );

        RouteDisplay.scan(cropRouter, "/api/crop");

        return cropRouter;
    }
}
