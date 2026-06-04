import z from "zod/v4";


export const CreateAddressSchema = z.object({
    number: z.number().positive().optional(),
    street: z.string().min(3, 'Nome de rua muito curto').max(60, 'Nome de rua muito grande').optional(),
    complement: z.string().min(2, 'Nome de complemento muito curto').max(40, 'Nome de complemento muito grande').optional(),
    neighborhood: z.string().min(2, 'Nome de bairro muito curto').max(100, 'Nome de bairro muito grande').optional(),
    city: z.string().min(2, 'Nome de cidade muito curto').max(100, 'Nome de cidade muito grande').nonempty({ message: 'Nome de cidade não pode ser vazio' }),
    state: z.string().min(2, 'Nome de estado muito curto').max(50, 'Nome de estado muito grande').nonempty({ message: 'Nome de bairro não pode ser vazio' }),
    country: z.string().min(2, 'Nome de país muito curto').max(50, 'Nome de país muito grande').nonempty({ message: 'Nome de estado não pode ser vazio' }),
});

export const UpdateAddressSchema = z.object({
    number: z.number().positive().optional(),
    street: z.string().min(3, 'Nome de rua muito curto').max(60, 'Nome de rua muito grande').optional(),
    complement: z.string().min(2, 'Nome de complemento muito curto').max(40, 'Nome de complemento muito grande').optional(),
    neighborhood: z.string().min(2, 'Nome de bairro muito curto').max(100, 'Nome de bairro muito grande').optional(),
    city: z.string().min(2, 'Nome de cidade muito curto').max(100, 'Nome de cidade muito grande').optional(),
    state: z.string().min(2, 'Nome de estado muito curto').max(50, 'Nome de estado muito grande').optional(),
    country: z.string().min(2, 'Nome de país muito curto').max(50, 'Nome de país muito grande').optional(),
});

export type AddressDtoCreate = z.infer<typeof CreateAddressSchema>;
export type AddressDtoUpdate = z.infer<typeof UpdateAddressSchema>;

export type AddressDtoView = {
    number: number | null;
    id: string;
    street: string | null;
    complement: string | null;
    neighborhood: string | null;
    city: string;
    state: string;
    country: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date | null;
}