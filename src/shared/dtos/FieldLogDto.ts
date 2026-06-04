import { $Enums } from "@prisma/client";
import z from "zod"

export const createFieldLogSchema = z.object({
    description: z.string().min(2, "Descricao muito curta"),
    category: z.enum($Enums.LogCategory),
    date: z.coerce.date().optional(),
    seasonId: z.uuid("ID invalido"),
});

export const updateFieldLogSchema = z.object({
    id: z.uuid("ID invalido"),
    description: z.string().min(2).optional(),
    category: z.enum($Enums.LogCategory).optional(),
    date: z.coerce.date().optional(),
    seasonId: z.uuid().optional(),

});

export type FieldLogDtoCreate = z.infer<typeof createFieldLogSchema>;
export type FieldLogDtoUpdate = z.infer<typeof updateFieldLogSchema>;

export type FieldLogDtoView = {
    id: string;
    description: string;
    category: $Enums.LogCategory;
    date: Date;
    seasonId: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date | null;
};