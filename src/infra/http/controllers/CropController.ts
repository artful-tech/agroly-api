import { Request, Response } from "express";
import { ICropUsecase } from "../../../core/usecases/interfaces";
import { ICropController } from "./interfaces";
import { CropDtoCreate, CropDtoUpdate, CropDtoView } from "../../../shared/dtos/CropDto";


export class CropController implements ICropController {
    constructor(private cropUsecase: ICropUsecase) { }

    public index = async (_req: Request, res: Response): Promise<Response> => {
        const crops: CropDtoView[] = await this.cropUsecase.getAll();
        return res.json(crops);
    }

    public getOne = async (req: Request<{id: string}>, res: Response): Promise<Response> => {
            const { id } = req.params;
            const crop: CropDtoView = await this.cropUsecase.getOne(id);
            return res.json(crop);
        }

    public create = async (req: Request, res: Response): Promise<Response> => {
        const cropDto: CropDtoCreate = req.body;
        const id = await this.cropUsecase.create(cropDto);
        res.setHeader('x-resource-id', id);
        res.setHeader('Location', `/api/crop/${id}`);
        return res.status(201).send();
    }

    public update = async (req: Request, res: Response): Promise<Response> => {
        const cropDto: CropDtoUpdate = req.body;
        const crop: CropDtoView = await this.cropUsecase.update(cropDto);
        return res.status(200).json(crop);
    }

    public delete = async (req: Request<{ id: string }>, res: Response): Promise<Response> => {
        const { id } = req.params;
        await this.cropUsecase.delete(id);
        return res.status(204).send();
    }
}
