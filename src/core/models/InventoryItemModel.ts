import { InventoryItem, Prisma } from "@prisma/client";
import {
  InventoryItemDtoCreate,
  InventoryItemDtoUpdate,
  InventoryItemDtoView
} from "../../shared/dtos/InventoryItemDto";

export type InventoryItemModel = InventoryItem;
export type InventoryItemModelCreate = Prisma.InventoryItemCreateInput;
export type InventoryItemModelUpdate = Prisma.InventoryItemUpdateInput;

export class InventoryItemMapper {

    static toView(model: InventoryItemModel): InventoryItemDtoView;
    static toView(models: InventoryItemModel[]): InventoryItemDtoView[];

    /**
     * Transforma o modelo do Banco/Prisma para o que o Front-end precisa
     */
    static toView(model: InventoryItemModel | InventoryItemModel[]): InventoryItemDtoView | InventoryItemDtoView[] {
        if (Array.isArray(model)) {
            return model.map(item => this.mapToDto(item));
        }

        return this.mapToDto(model);
    }

    /**
     * Transforma o que vem do Front-end (Create) para o Prisma Input
     */
    static fromCreateDtoToInput(dto: InventoryItemDtoCreate): Prisma.InventoryItemCreateInput {
        return {
            name: dto.name,
            category: dto.category,
            quantity: dto.quantity,
            unit: dto.unit,
            minStock: dto.minStock,
            farm: {
                connect: {
                    id: dto.farmId
                }
            }
        };
    }

    /**
     * Transforma Update DTO para Prisma UpdateInput
     */
    static fromUpdateDtoToInput(dto: InventoryItemDtoUpdate): Prisma.InventoryItemUpdateInput {
        return {
            id: dto.id,
            name: dto.name,
            category: dto.category,
            quantity: dto.quantity,
            unit: dto.unit,
            minStock: dto.minStock
        };
    }

    private static mapToDto(model: InventoryItemModel): InventoryItemDtoView {
        return {
            name: model.name,
            id: model.id,
            category: model.category,
            quantity: model.quantity,
            unit: model.unit,
            minStock: model.minStock,
            farmId: model.farmId,
            createdAt: model.createdAt,
            updatedAt: model.updatedAt,
            deletedAt: model.deletedAt
        };
    }
}