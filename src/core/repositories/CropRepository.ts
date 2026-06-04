import { PrismaClient } from "@prisma/client";
import { ICropRepository } from "./interfaces";
import { CropModelCreate, CropModel, CropModelUpdate } from "../models/CropModel";
import { AppError } from "../errors/AppError";


export class CropRepository implements ICropRepository {
    constructor(private prisma: PrismaClient) {}

    public findAll = async (): Promise<CropModel[]> => {
        return await this.prisma.crop.findMany({
            where: { deletedAt: null }
        });
    }

    public findOne = async (id: string): Promise<CropModel> => {
        return await this.prisma.crop.findUniqueOrThrow({
            where: { 
                id: id,
                deletedAt: null
            }
        });
    }

    public create = async (model: CropModelCreate): Promise<string> => {
        const cropExists = await this.prisma.crop.findFirst({
            where: {
                name: model.name,
                variety: model.variety ?? null,
                deletedAt: null
            }
        });

        if (cropExists) {
            throw new AppError('Já existe uma planta cadastrada com esse nome e variedade', 409)
        }

        const crop = await this.prisma.crop.create({
            data: model
        });
        
        return crop.id;
    }

    public update = async (id: string, data: CropModelUpdate): Promise<CropModel> => {
        await this.prisma.crop.findFirstOrThrow({
            where: { id }
        });

        return await this.prisma.crop.update({
            where: { 
                id: id,
                deletedAt: null
            },
            data: data
        });
    }

    public delete = async (id: string): Promise<void> => {
        await this.prisma.crop.findUniqueOrThrow({
            where: { 
                id: id,
                deletedAt: null
             }
        });

        await this.prisma.crop.update({
            where: { id: id },
            data: { deletedAt: new Date() }
        })
        
    }
}
