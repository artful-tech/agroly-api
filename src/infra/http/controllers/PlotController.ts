import { Request, Response } from "express";
import { IPlotUsecase } from "../../../core/usecases/interfaces";
import { IPlotController } from "./interfaces";
import { PlotDtoCreate, PlotDtoUpdate, PlotDtoView } from "../../../shared/dtos/PlotDto";


export class PlotController implements IPlotController {
    
    constructor(private plotUsecase: IPlotUsecase) { }

    public index = async (_req: Request, res: Response): Promise<Response>  => {
        const plots: PlotDtoView[] = await this.plotUsecase.getAll();
        return res.json(plots);
    }

    public getOne = async (req: Request<{id: string}>, res: Response): Promise<Response> => {
        const { id } = req.params;
        const plot: PlotDtoView = await this.plotUsecase.getOne(id);
        return res.json(plot);
    }
    
    public create = async (req: Request, res: Response): Promise<Response> => {
        const plotDto: PlotDtoCreate = req.body;
        const id: string = await this.plotUsecase.create(plotDto);
        res.setHeader('x-resource-id', id);
        res.setHeader('Location', `/api/plot/${id}`);
        return res.status(201).send();
    }

    public update = async (req: Request, res: Response): Promise<Response> => {
        const plotDto: PlotDtoUpdate = req.body;
        const plot: PlotDtoView = await this.plotUsecase.update(plotDto);
        return res.status(200).json(plot);
    }

    public delete = async (req: Request<{ id: string }>, res: Response): Promise<Response> => {
        const { id } = req.params;
        await this.plotUsecase.delete(id);
        return res.status(204).send();
    }
}