import { Prisma, Season } from "@prisma/client";
import { SeasonDtoCreate, SeasonDtoUpdate, SeasonDtoView } from "../../shared/dtos/SeasonDto";

export type SeasonModel = Season;
export type SeasonModelCreate = Prisma.SeasonCreateInput;
export type SeasonModelUpdate = Prisma.SeasonUpdateInput;

export class SeasonMapper {
    static toView(model: SeasonModel): SeasonDtoView;
    static toView(models: SeasonModel[]): SeasonDtoView[];

    /**
     * Transforma o modelo do Banco/Prisma para o que o Front-end precisa
     */
    static toView(model: SeasonModel | SeasonModel[]): SeasonDtoView | SeasonDtoView[] {
        if (Array.isArray(model)) {
            return model.map(item => this.mapToDto(item));
        }
        return this.mapToDto(model);
    }

    /**
     * Transforma o que vem do Front-end (View) Create para o Modelo de Domínio
     */
    static fromCreateDtoToInput(dto: SeasonDtoCreate): SeasonModelCreate {
        return {
            status: dto.status,
            plantedAt: dto.plantedAt,
            harvestAt: dto.harvestAt,
            photo: dto.photo,
            plot: {
                connect: { id: dto.plotId }
            },
            crop: {
                connect: { id: dto.cropId }
            }
        };
    }

    static fromUpdateDtoToInput(dto: SeasonDtoUpdate): SeasonModelUpdate {
        return {
            status: dto.status,
            plantedAt: dto.plantedAt,
            harvestAt: dto.harvestAt,
            photo: dto.photo,
            plot: {
                connect: { id: dto.plotId }
            },
            crop: {
                connect: { id: dto.cropId }
            }
        };
    }

    private static mapToDto(model: SeasonModel): SeasonDtoView {
        return {
            id: model.id,
            status: model.status,
            plantedAt: model.plantedAt,
            harvestAt: model.harvestAt,
            photo: model.photo,
            plotId: model.plotId,
            cropId: model.cropId,
            createdAt: model.createdAt,
            updatedAt: model.updatedAt,
            deletedAt: model.deletedAt
        };
    }
}