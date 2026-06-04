import { FarmDtoCreate, FarmDtoUpdate, FarmDtoView } from "../../shared/dtos/FarmDto";
import { FarmMapper } from "../models/FarmModel";
import { IFarmRepository } from "../repositories/interfaces";
import { IFarmUsecase } from "./interfaces";

export class FarmUsecase implements IFarmUsecase {
    constructor(private farmRepository: IFarmRepository) {}
    
    public getAll = async (): Promise<FarmDtoView[]> => {
        const farms = await this.farmRepository.findAll();
        return FarmMapper.toView(farms);
    }

    public getOne = async (id: string): Promise<FarmDtoView> => {
            const farm = await this.farmRepository.findOne(id);
            return FarmMapper.toView(farm);
        }

    public create = async (createDto: FarmDtoCreate): Promise<string> => {
        const model = FarmMapper.fromCreateDtoToInput(createDto);

        const farmId = await this.farmRepository.create(model);

        return farmId;
    }

    public update = async (updateDto: FarmDtoUpdate): Promise<FarmDtoView> => {
            const model = FarmMapper.fromUpdateDtoToInput(updateDto);
            const { id, ...data } = model;
            return await this.farmRepository.update(id as string, data);
        }

    public delete = async (id: string): Promise<void> => {
        await this.farmRepository.delete(id);
    }
}