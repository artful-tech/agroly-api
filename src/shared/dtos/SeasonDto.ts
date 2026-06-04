import { $Enums } from "@prisma/client";
import z from "zod";

export const createSeasonSchema = z.object({
    status: z.enum($Enums.SeasonStatus),
    plantedAt: z.date(),
    harvestAt: z.date().optional(),
    photo: z.url(),
    plotId: z.uuid(),
    cropId: z.uuid("ID inválido"),
});

export const updateSeasonSchema = z.object({
    id: z.uuid("ID inválido"),
    status: z.enum($Enums.SeasonStatus).optional(),
    plantedAt: z.date().optional().optional(),
    harvestAt: z.date().optional().optional(),
    photo: z.string().optional(),
    plotId: z.uuid().optional(),
    cropId: z.uuid("ID inválido").optional(),
});

export type SeasonDtoCreate = z.infer<typeof createSeasonSchema>;
export type SeasonDtoUpdate = z.infer<typeof updateSeasonSchema>;

export type SeasonDtoView = {
    id: string;
    status: $Enums.SeasonStatus;
    plantedAt: Date;
    harvestAt: Date | null;
    photo: string | null;
    plotId: string;
    cropId: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date | null;
}