import { InventoryItemDtoCreate, InventoryItemDtoUpdate, InventoryItemDtoView } from "../../shared/dtos/InventoryItemDto";
import { InventoryItemMapper } from "../models/InventoryItemModel";
import { IInventoryItemRepository } from "../repositories/interfaces";
import { IInventoryItemUsecase } from "./interfaces";

export class InventoryItemUsecase implements IInventoryItemUsecase {
    constructor(private inventoryItemrepository: IInventoryItemRepository) { }

    public getAll = async (): Promise<InventoryItemDtoView[]> => {
        const inventoryItems = await this.inventoryItemrepository.findAll();
        return InventoryItemMapper.toView(inventoryItems);
    };

    public getOne = async (id: string): Promise<InventoryItemDtoView> => {
        const inventoryItem = await this.inventoryItemrepository.findOne(id);
        return InventoryItemMapper.toView(inventoryItem);
    }

    public create = async (createDto: InventoryItemDtoCreate): Promise<string> => {
        const model = InventoryItemMapper.fromCreateDtoToInput(createDto);
        return await this.inventoryItemrepository.create(model);
    }

    public update = async (updateDto: InventoryItemDtoUpdate): Promise<InventoryItemDtoView> => {
        const model = InventoryItemMapper.fromUpdateDtoToInput(updateDto);
        const { id, ...data } = model;
        return await this.inventoryItemrepository.update(id as string, data);
    }

    public delete = async (id: string): Promise<void> => {
        await this.inventoryItemrepository.delete(id);
    }
}