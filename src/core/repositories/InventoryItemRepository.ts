import { PrismaClient } from "@prisma/client";
import { IInventoryItemRepository } from "./interfaces";
import { InventoryItemModel, InventoryItemModelCreate, InventoryItemModelUpdate } from "../models/InventoryItemModel";

export class InventoryItemRepository implements IInventoryItemRepository {
    constructor(private prisma: PrismaClient) { }

    public findAll = async (): Promise<InventoryItemModel[]> => {
        return await this.prisma.inventoryItem.findMany({
            where: {
                deletedAt: null
            }
        });
    };

    public findOne = async (id: string): Promise<InventoryItemModel> => {
        return await this.prisma.inventoryItem.findUniqueOrThrow({
            where: { 
                id: id,
                deletedAt: null
            }
        });
    }

    public create = async (model: InventoryItemModelCreate): Promise<string> => {
        const inventoryItem = await this.prisma.inventoryItem.create({
            data: model
        });

        return inventoryItem.id;
    }

    public update = async (id: string, data: InventoryItemModelUpdate): Promise<InventoryItemModel> => {
        await this.prisma.inventoryItem.findFirstOrThrow({
            where: { id }
        });

        return await this.prisma.inventoryItem.update({
            where: { 
                id: id,
                deletedAt: null
            },
            data: data
        });
    }

    public delete = async (id: string): Promise<void> => {
        await this.prisma.inventoryItem.findUniqueOrThrow({
            where: { 
                id: id,
                deletedAt: null
            }
        });

        await this.prisma.inventoryItem.update({
            where: { id: id },
            data: { deletedAt: new Date() }
        })
    }
}