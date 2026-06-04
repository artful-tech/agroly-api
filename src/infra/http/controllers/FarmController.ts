import { Request, Response } from "express";
import { IFarmUsecase } from "../../../core/usecases/interfaces";
import { IFarmController } from "./interfaces";
import { FarmDtoCreate, FarmDtoUpdate, FarmDtoView } from "../../../shared/dtos/FarmDto";

export class FarmController implements IFarmController {
    constructor(private farmUsecase: IFarmUsecase) {}

    public index = async (_req: Request, res: Response): Promise<Response> => {
        const farms: FarmDtoView[] = await this.farmUsecase.getAll();
        return res.json(farms);
    }

    public getOne = async (req: Request<{id: string}>, res: Response): Promise<Response> => {
        const { id } = req.params;
        const farm: FarmDtoView = await this.farmUsecase.getOne(id);
        return res.json(farm);
    }
    
    public create = async (req: Request, res: Response): Promise<Response> => {
        const farmDto: FarmDtoCreate = req.body;
        const id = await this.farmUsecase.create(farmDto);
        res.setHeader('x-resource-id', id);
        res.setHeader('Location', `/api/farm/${id}`);
        return res.status(201).send();
    }

    public update = async (req: Request, res: Response): Promise<Response> => {
        const farmDto: FarmDtoUpdate = req.body;
        const farm: FarmDtoView = await this.farmUsecase.update(farmDto);
        return res.status(200).json(farm);
    }

    public delete = async (req: Request<{ id: string }>, res: Response): Promise<Response> => {
        const { id } = req.params;
        await this.farmUsecase.delete(id);
        return res.status(204).send();
    }
}