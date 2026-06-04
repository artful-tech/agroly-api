import { CropDtoCreate, CropDtoUpdate, CropDtoView } from "../../shared/dtos/CropDto";
import { CropMapper } from "../models/CropModel";
import { ICropRepository } from "../repositories/interfaces";
import { ICropUsecase } from "./interfaces";


export class CropUsecase implements ICropUsecase {

    constructor(private cropRepository: ICropRepository) { }

    public getAll = async (): Promise<CropDtoView[]> => {
        const crops = await this.cropRepository.findAll();
        return CropMapper.toView(crops);
    }

    public getOne = async (id: string): Promise<CropDtoView> => {
        const crop = await this.cropRepository.findOne(id);
        return CropMapper.toView(crop);
    }

    public create = async (createDto: CropDtoCreate): Promise<string> => {
        const model = CropMapper.fromCreateDtoToInput(createDto);
        return await this.cropRepository.create(model);
    }

    public update = async (updateDto: CropDtoUpdate): Promise<CropDtoView> => {
        const model = CropMapper.fromUpdateDtoToInput(updateDto);
        const { id, ...data } = model;
        return await this.cropRepository.update(id as string, data);
    }

    public delete = async (id: string): Promise<void> => {
        await this.cropRepository.delete(id);
    }
}