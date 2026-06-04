import { PrismaClient } from "@prisma/client";
import { IFieldLogRepository } from "./interfaces";
import { FieldLogModel, FieldLogModelCreate, FieldLogModelUpdate } from "../models/FieldLogModel";

export class FieldLogRepository implements IFieldLogRepository {
    constructor(private prisma: PrismaClient) { }

    public findAll = async (): Promise<FieldLogModel[]> => {
        return await this.prisma.fieldLog.findMany({
            where: {
                deletedAt: null
            }
        });
    }

    public findOne = async (id: string): Promise<FieldLogModel> => {
        return await this.prisma.fieldLog.findUniqueOrThrow({
            where: { 
                id: id,
                deletedAt: null
            }
        });
    }

    public create = async (model: FieldLogModelCreate): Promise<string> => {
        const fieldLog = await this.prisma.fieldLog.create({
            data: model
        });

        return fieldLog.id;
    }

    public update = async (id: string, data: FieldLogModelUpdate): Promise<FieldLogModel> => {
        await this.prisma.fieldLog.findFirstOrThrow({
            where: { id }
        });

        return await this.prisma.fieldLog.update({
            where: { 
                id: id,
                deletedAt: null
            },
            data: data
        });
    }

    public delete = async (id: string): Promise<void> => {
        await this.prisma.fieldLog.findUniqueOrThrow({
            where: { 
                id: id,
                deletedAt: null
            }
        });

        await this.prisma.fieldLog.update({
            where: { id: id },
            data: { deletedAt: new Date() }
        })
    }
}