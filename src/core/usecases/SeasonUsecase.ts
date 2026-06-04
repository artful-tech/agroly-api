import { SeasonDtoCreate, SeasonDtoUpdate, SeasonDtoView } from "../../shared/dtos/SeasonDto";
import { SeasonMapper } from "../models/SeasonModel";
import { ISeasonRepository } from "../repositories/interfaces";
import { ISeasonUsecase } from "./interfaces";

export class SeasonUsecase implements ISeasonUsecase {
    constructor(private seasonRepository: ISeasonRepository) {}

    public getAll = async (): Promise<SeasonDtoView[]> => {
        const seasons = await this.seasonRepository.findAll();
        return SeasonMapper.toView(seasons);
    }

    public getOne = async (id: string): Promise<SeasonDtoView> => {
        const season = await this.seasonRepository.findOne(id);
        return SeasonMapper.toView(season);
    }

    public create = async (createDto: SeasonDtoCreate): Promise<string> => {
        const model = SeasonMapper.fromCreateDtoToInput(createDto);
        return await this.seasonRepository.create(model);
    }

    public update = async (updateDto: SeasonDtoUpdate): Promise<SeasonDtoView> => {
        const model = SeasonMapper.fromUpdateDtoToInput(updateDto);
        const { id, ...data } = model;
        return await this.seasonRepository.update(id as string, data);
    }

    public delete = async (id: string): Promise<void> => {
        await this.seasonRepository.delete(id);
    }
}