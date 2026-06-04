import z from "zod";

export const createInventoryItemSchema = z.object({
    name: z.string(),
    category: z.string().optional(),
    quantity: z.number().positive(),
    unit: z.string(),
    minStock: z.number().positive(),
    farmId: z.uuid("ID inválido"),
});

export const updateInventoryItemSchema = z.object({
    id: z.uuid("ID inválido"),
    name: z.string().optional(),
    category: z.string().optional(),
    quantity: z.number().positive().optional(),
    unit: z.string().optional(),
    minStock: z.number().positive().optional(),
    farmId: z.uuid("ID inválido").optional(),
});

export type InventoryItemDtoCreate = z.infer<typeof createInventoryItemSchema>;
export type InventoryItemDtoUpdate = z.infer<typeof updateInventoryItemSchema>;

export type InventoryItemDtoView = {
    name: string;
    id: string;
    category: string | null;
    quantity: number;
    unit: string;
    minStock: number;
    farmId: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
}
