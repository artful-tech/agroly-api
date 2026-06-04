import { PrismaClient } from "@prisma/client";
import { SeasonModel, SeasonModelCreate, SeasonModelUpdate } from "../models/SeasonModel";


export class SeasonRepository {
    constructor(private prisma: PrismaClient) {}

    public findAll = async (): Promise<SeasonModel[]> => {
        return await this.prisma.season.findMany({
            where: {
                deletedAt: null
            }
        });
    }

    public findOne = async (id: string): Promise<SeasonModel> => {
        return await this.prisma.season.findUniqueOrThrow({
            where: { 
                id: id,
                deletedAt: null
            }
        });
    }

    public create = async (model: SeasonModelCreate): Promise<string> => {
        const season = await this.prisma.season.create({
            data: model
        });

        return season.id;
    }

    public update = async (id: string, data: SeasonModelUpdate): Promise<SeasonModel> => {
        await this.prisma.season.findFirstOrThrow({
            where: { id }
        });

        return await this.prisma.season.update({
            where: { 
                id: id,
                deletedAt: null
            },
            data: data
        });
    }

    public delete = async (id: string): Promise<void> => {
        await this.prisma.season.findUniqueOrThrow({
            where: { 
                id: id,
                deletedAt: null
            }
        });

        await this.prisma.season.update({
            where: { id: id },
            data: { deletedAt: new Date() }
        })
    }
}