import { Router } from "express";
import { FieldLogController } from "../controllers/FieldLogController";
import { RouteDisplay } from "../../utils/RouteDisplay";
import { ValidationMiddleware } from "../middlewares/ValidationMiddleware";
import { idUUIDParamSchema } from "../../../shared/dtos";
import { createFieldLogSchema, updateFieldLogSchema } from "../../../shared/dtos/FieldLogDto";

export class FieldLogRouter {
    constructor(private fieldLogController: FieldLogController) { }

    getRoutes = (): Router => {
        const fieldLogRouter = Router();

        fieldLogRouter.get(
            '/', 
            this.fieldLogController.index
        );

        fieldLogRouter.get(
            '/:id', 
            ValidationMiddleware.validate(idUUIDParamSchema, 'params'),
            this.fieldLogController.getOne
        );

        fieldLogRouter.post(
            '/', 
            ValidationMiddleware.validate(createFieldLogSchema),
            this.fieldLogController.create
        );

        fieldLogRouter.patch(
            '/', 
            ValidationMiddleware.validate(updateFieldLogSchema),
            this.fieldLogController.update
        );

        fieldLogRouter.delete(
            '/:id', 
            ValidationMiddleware.validate(idUUIDParamSchema, 'params'),
            this.fieldLogController.delete
        );

        RouteDisplay.scan(fieldLogRouter, "/api/field-log");

        return fieldLogRouter;
    }
}