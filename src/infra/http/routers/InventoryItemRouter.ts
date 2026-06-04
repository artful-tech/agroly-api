import { Router } from "express";
import { InventoryItemController } from "../controllers/InventoryItemController";
import { ValidationMiddleware } from "../middlewares/ValidationMiddleware";
import { idUUIDParamSchema } from "../../../shared/dtos";
import { createInventoryItemSchema, updateInventoryItemSchema } from "../../../shared/dtos/InventoryItemDto";
import { RouteDisplay } from "../../utils/RouteDisplay";


export class InventoryItemRouter {
    constructor(private inventoryItemController: InventoryItemController) {}
    
    getRoutes = (): Router => {
        const inventoryItemRouter = Router();

        inventoryItemRouter.get(
            '/', 
            this.inventoryItemController.index
        );

        inventoryItemRouter.get(
            '/:id', 
            ValidationMiddleware.validate(idUUIDParamSchema, 'params'),
            this.inventoryItemController.getOne
        );

        inventoryItemRouter.post(
            '/', 
            ValidationMiddleware.validate(createInventoryItemSchema),
            this.inventoryItemController.create
        );

        inventoryItemRouter.patch(
            '/', 
            ValidationMiddleware.validate(updateInventoryItemSchema),
            this.inventoryItemController.update
        );

        inventoryItemRouter.delete(
            '/:id', 
            ValidationMiddleware.validate(idUUIDParamSchema, 'params'),
            this.inventoryItemController.delete
        );

        RouteDisplay.scan(inventoryItemRouter, "/api/inventory-item");

        return inventoryItemRouter;
    }
}