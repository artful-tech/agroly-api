import { FieldLog, Prisma } from "@prisma/client";
import { FieldLogDtoCreate, FieldLogDtoUpdate, FieldLogDtoView } from "../../shared/dtos/FieldLogDto";

export type FieldLogModel = FieldLog;
export type FieldLogModelCreate = Prisma.FieldLogCreateInput;
export type FieldLogModelUpdate = Prisma.FieldLogUpdateInput;

export class FieldLogMapper {
    static toView(model: FieldLogModel): FieldLogDtoView;
    static toView(models: FieldLogModel[]): FieldLogDtoView[];

    /**
     * Transforma o modelo do Banco/Prisma para o que o Front-end precisa
     */
    public static toView(model: FieldLogModel | FieldLogModel[]): FieldLogDtoView | FieldLogDtoView[] {
        if (Array.isArray(model)) {
            return model.map(item => this.mapToDto(item));
        }
        return this.mapToDto(model);
    }
    
    /**
     * Transforma o que vem do Front-end (View) Create para o Modelo de Domínio
     */
    public static fromCreateDtoToInput(dto: FieldLogDtoCreate): FieldLogModelCreate {
        return {
            description: dto.description,
            category: dto.category,
            date: dto.date,
            season: {
                connect: { id: dto.seasonId }
            }
        };
    }

    static fromUpdateDtoToInput(dto: FieldLogDtoUpdate): FieldLogModelUpdate {
        return {
            description: dto.description,
            category: dto.category,
            date: dto.date,
            season: {
                connect: { id: dto.seasonId }
            }
        };
    }

    private static mapToDto(model: FieldLogModel): FieldLogDtoView {
        return {
            id: model.id,
            description: model.description,
            category: model.category,
            date: model.date,
            seasonId: model.seasonId,
            createdAt: model.createdAt,
            updatedAt: model.updatedAt,
            deletedAt: model.deletedAt,
        };
    }
}