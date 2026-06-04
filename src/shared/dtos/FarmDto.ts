import { AddressDtoCreate, AddressDtoUpdate, CreateAddressSchema, UpdateAddressSchema } from "./AddressDto";
import z from "zod";

export const createFarmSchema = z.object({
    name: z.string().min(2).max(150),
    totalArea: z.number().positive(),
    unity: z.string().min(1).max(20),
    resume: z.string().optional(),
    photo: z.url(),
    address: CreateAddressSchema,
    observation: z.string().optional(),
});

export const updateFarmSchema = z.object({
    id: z.uuid("ID inválido"),
    name: z.string().min(2).max(150).optional(),
    totalArea: z.number().positive().optional(),
    unity: z.string().min(1).max(20).optional(),
    resume: z.string().optional(),
    photo: z.url().optional(),
    address: UpdateAddressSchema.optional(),
    observation: z.string().optional().optional(),
});

export type FarmDtoCreate = z.infer<typeof createFarmSchema>;
export type FarmDtoUpdate = z.infer<typeof updateFarmSchema>;

export type FarmDtoView = {
    name: string;
    id: string;
    totalArea: number;
    unity: string;
    resume: string | null;
    photo: string | null;
    addressId: string;
    observation: string | null;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date | null;
}

