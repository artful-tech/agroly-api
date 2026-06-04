import { FieldLogDtoCreate, FieldLogDtoView } from "../../shared/dtos/FieldLogDto";
import { FieldLogMapper } from "../models/FieldLogModel";
import { IFieldLogRepository } from "../repositories/interfaces";
import { IFieldLogUsecase } from "./interfaces";

export class FieldLogUsecase implements IFieldLogUsecase {
    constructor(private fieldLogRepository: IFieldLogRepository) {}

    public getAll = async (): Promise<FieldLogDtoView[]> => {
        const fieldLogs = await this.fieldLogRepository.findAll();
        return FieldLogMapper.toView(fieldLogs);
    }

    public getOne = async (id: string): Promise<FieldLogDtoView> => {
        const fieldLog = await this.fieldLogRepository.findOne(id);
        return FieldLogMapper.toView(fieldLog);
    }

    public create = async (createDto: FieldLogDtoCreate): Promise<string> => {
        const model = FieldLogMapper.fromCreateDtoToInput(createDto);
        return await this.fieldLogRepository.create(model);
    }

    public update = async (updateDto: any): Promise<FieldLogDtoView> => {
        const model = FieldLogMapper.fromUpdateDtoToInput(updateDto);
        const { id, ...data } = model;
        return await this.fieldLogRepository.update(id as string, data);
    }

    public delete = async (id: string): Promise<void> => {
        await this.fieldLogRepository.delete(id);
    }
}