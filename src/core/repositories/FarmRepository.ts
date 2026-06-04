import { PrismaClient } from "@prisma/client";
import { IFarmRepository } from "./interfaces";
import { FarmModel, FarmModelCreate, FarmModelUpdate } from "../models/FarmModel";

export class FarmRepository implements IFarmRepository {
    constructor(private prisma: PrismaClient) {}
    
    public findAll = async (): Promise<FarmModel[]> => {
        return await this.prisma.farm.findMany();
    }

    public findOne = async (id: string): Promise<FarmModel> => {
            return await this.prisma.farm.findUniqueOrThrow({
                where: { 
                    id: id,
                    deletedAt: null
                }
            });
        }

    public create = async (model: FarmModelCreate): Promise<string> => {
        const farm = await this.prisma.farm.create({
            data: model,
        });

        return farm.id;
    }

    public update = async (id: string, data: FarmModelUpdate): Promise<FarmModel> => {
        await this.prisma.farm.findFirstOrThrow({
            where: { id }
        });

        return await this.prisma.farm.update({
            where: { 
                id: id,
                deletedAt: null
            },
            data: data
        });
    }

    public delete = async (id: string): Promise<void> => {
        await this.prisma.farm.findUniqueOrThrow({
            where: { id }
        });

        await this.prisma.farm.update({
            where: { id: id },
            data: { deletedAt: new Date() }
        })
    }
}