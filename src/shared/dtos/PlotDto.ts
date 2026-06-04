import z from "zod";


export const createPlotSchema = z.object({
    name: z.string(),
    area: z.number().positive(),
    unity: z.string(),
    soilType: z.string().optional(),
    farmId: z.uuid("ID inválido"),
    photo: z.url().optional(),
    observation: z.string().optional(),
})

export const updatePlotSchema = z.object({
    id: z.uuid("ID inválido"),
    name: z.string().optional(),
    area: z.number().positive().optional(),
    unity: z.string().optional(),
    soilType: z.string().optional(),
    farmId: z.uuid("ID inválido").optional(),
    photo: z.url().optional(),
    observation: z.string().optional(),
})

export type PlotDtoCreate = z.infer<typeof createPlotSchema>;
export type PlotDtoUpdate = z.infer<typeof updatePlotSchema>;

export type PlotDtoView = {
    name: string;
    id: string;
    area: number;
    unity: string;
    soilType: string | null;
    farmId: string;
    photo: string | null;
    observation: string | null;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date | null;
}