import { Request, Response } from "express";
import { IFieldLogUsecase } from "../../../core/usecases/interfaces";
import { IFieldLogController } from "./interfaces";
import { FieldLogDtoCreate, FieldLogDtoUpdate, FieldLogDtoView } from "../../../shared/dtos/FieldLogDto";

export class FieldLogController implements IFieldLogController {
    constructor(private fieldLogUsecase: IFieldLogUsecase) {}

    public index = async (_req: Request, res: Response): Promise<Response> => {
        const fieldLogs: FieldLogDtoView[] = await this.fieldLogUsecase.getAll();
        return res.json(fieldLogs);
    }

    public getOne = async (req: Request<{id: string}>, res: Response): Promise<Response> => {
        const { id } = req.params;
        const fieldLog: FieldLogDtoView = await this.fieldLogUsecase.getOne(id);
        return res.json(fieldLog);
    }

    public create = async (req: Request, res: Response): Promise<Response> => {
        const fieldLogDto: FieldLogDtoCreate = req.body;
        const id: string = await this.fieldLogUsecase.create(fieldLogDto);
        res.setHeader('x-resource-id', id);
        res.setHeader('Location', `/api/fieldLog/${id}`);
        return res.status(201).send();
    }

    public update = async (req: Request, res: Response): Promise<Response> => {
        const fieldLogDto: FieldLogDtoUpdate = req.body;
        const fieldLog: FieldLogDtoView = await this.fieldLogUsecase.update(fieldLogDto);
        return res.status(200).json(fieldLog);
    }

    public delete = async (req: Request<{ id: string }>, res: Response): Promise<Response> => {
        const { id } = req.params;
        await this.fieldLogUsecase.delete(id);
        return res.status(204).send();
    }
}