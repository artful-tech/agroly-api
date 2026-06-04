import { PlotDtoCreate, PlotDtoUpdate, PlotDtoView } from "../../shared/dtos/PlotDto";
import { PlotMapper } from "../models/PlotModel";
import { IPlotRepository } from "../repositories/interfaces";
import { IPlotUsecase } from "./interfaces";

export class PlotUsecase implements IPlotUsecase {
    constructor(private plotRepository: IPlotRepository) {}
        
    public getAll = async (): Promise<PlotDtoView[]> => {
        const plots = await this.plotRepository.findAll();
        return PlotMapper.toView(plots);
    }

    public getOne = async (id: string): Promise<PlotDtoView> => {
        const plot = await this.plotRepository.findOne(id);
        return PlotMapper.toView(plot);
    }

    public create = async (createDto: PlotDtoCreate): Promise<string> => {
        const model = PlotMapper.fromCreateDtoToInput(createDto);
        return await this.plotRepository.create(model);
    }

    public update = async (updateDto: PlotDtoUpdate): Promise<PlotDtoView> => {
        const model = PlotMapper.fromUpdateDtoToInput(updateDto);
        const { id, ...data } = model;
        return await this.plotRepository.update(id as string, data);
    }

    public delete = async (id: string): Promise<void> => {
        await this.plotRepository.delete(id);
    }
}