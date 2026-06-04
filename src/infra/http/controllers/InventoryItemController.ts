import { Request, Response } from "express";
import { IIventoryItemController } from "./interfaces";
import { InventoryItemDtoCreate, InventoryItemDtoUpdate, InventoryItemDtoView } from "../../../shared/dtos/InventoryItemDto";
import { IInventoryItemUsecase } from "../../../core/usecases/interfaces";


export class InventoryItemController implements IIventoryItemController {
    constructor(private inventoryItemUsecase: IInventoryItemUsecase) { }

    public index = async (_req: Request, res: Response): Promise<Response> => {
        const inventoryItems: InventoryItemDtoView[] = await this.inventoryItemUsecase.getAll();
        return res.json(inventoryItems);
    }

    public getOne = async (req: Request<{ id: string }>, res: Response): Promise<Response> => {
        const { id } = req.params;
        const inventoryItem: InventoryItemDtoView = await this.inventoryItemUsecase.getOne(id);
        return res.json(inventoryItem);
    }

    public create = async (req: Request, res: Response): Promise<Response> => {
        const inventoryItemDto: InventoryItemDtoCreate = req.body;
        const id: string = await this.inventoryItemUsecase.create(inventoryItemDto);
        res.setHeader('x-resource-id', id);
        res.setHeader('Location', `/api/inventory-item/${id}`);
        return res.status(201).send();
    }

    public update = async (req: Request, res: Response): Promise<Response> => {
        const inventoryItemDto: InventoryItemDtoUpdate = req.body;
        const inventoryItem: InventoryItemDtoView = await this.inventoryItemUsecase.update(inventoryItemDto);
        return res.status(200).json(inventoryItem);
    }

    public delete = async (req: Request<{ id: string }>, res: Response): Promise<Response> => {
        const { id } = req.params;
        await this.inventoryItemUsecase.delete(id);
        return res.status(204).send();
    }
}