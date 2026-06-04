import { PrismaClient } from "@prisma/client";
import { IPlotRepository } from "./interfaces";
import { PlotModel, PlotModelCreate, PlotModelUpdate } from "../models/PlotModel";


export class PlotRepository implements IPlotRepository {
    constructor(private prisma: PrismaClient) { }

    public findAll = async (): Promise<PlotModel[]> => {
        return await this.prisma.plot.findMany({
            where: {
                deletedAt: null
            }
        });
    }

    public findOne = async (id: string): Promise<PlotModel> => {
        return await this.prisma.plot.findUniqueOrThrow({
            where: { 
                id: id,
                deletedAt: null
            }
        });
    }

    public create = async (data: PlotModelCreate): Promise<string> => {
        const plot = await this.prisma.plot.create({
            data: data
        });

        return plot.id;
    }

    public update = async (id: string, data: PlotModelUpdate): Promise<PlotModel> => {
        await this.prisma.plot.findFirstOrThrow({
            where: { id }
        });

        return await this.prisma.plot.update({
            where: { 
                id: id,
                deletedAt: null
            },
            data: data
        });
    }

    public delete = async (id: string): Promise<void> => {
        await this.prisma.plot.findUniqueOrThrow({
            where: { 
                id: id,
                deletedAt: null
            }
        });

        await this.prisma.plot.update({
            where: { id: id },
            data: { deletedAt: new Date() }
        })
    }

    
}