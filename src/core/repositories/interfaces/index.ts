import { CropModel, CropModelCreate, CropModelUpdate } from "../../models/CropModel";
import { FarmModel, FarmModelCreate, FarmModelUpdate } from "../../models/FarmModel";
import { PlotModel, PlotModelCreate, PlotModelUpdate } from "../../models/PlotModel";
import { UserModel, UserModelCreate, UserModelUpdate } from "../../models/UserModel";
import { FieldLogModel, FieldLogModelCreate, FieldLogModelUpdate } from "../../models/FieldLogModel";
import { FinanceModel } from "../../models/FinanceModel";
import { PeopleModel, PeopleModelCreate, PeopleModelUpdate } from "../../models/PeopleModel";
import { SeasonModel, SeasonModelCreate, SeasonModelUpdate } from "../../models/SeasonModel";
import { InventoryItemModel, InventoryItemModelCreate, InventoryItemModelUpdate } from "../../models/InventoryItemModel";

/**
 * Interface base para os casos de uso (Usecases) do Agrofy.
 * * @template M - Model
 * @template C - Create Model
 * @template U - Update Model
 * @template T - Tipo do ID para exclusão (ex: string ou number)
 */
export interface IBaseRepository<M, C, U, T> {
    findAll(): Promise<M[]>
    findOne(id: string): Promise<M>
    create(model: C): Promise<string>
    update(id: T, data: U): Promise<M>
    delete(id: T): Promise<void>
}

export interface ICropRepository extends IBaseRepository<CropModel, CropModelCreate, CropModelUpdate, string> { }

export interface IFarmRepository extends IBaseRepository<FarmModel, FarmModelCreate, FarmModelUpdate, string> { }

export interface IPlotRepository extends IBaseRepository<PlotModel, PlotModelCreate, PlotModelUpdate, string> { }

export interface IFieldLogRepository extends IBaseRepository<FieldLogModel, FieldLogModelCreate, FieldLogModelUpdate, string> { }

export interface IPeopleRepository extends IBaseRepository<PeopleModel, PeopleModelCreate, PeopleModelUpdate, string> { }

export interface ISeasonRepository extends IBaseRepository<SeasonModel, SeasonModelCreate, SeasonModelUpdate, string> { }

export interface IInventoryItemRepository extends IBaseRepository<InventoryItemModel, InventoryItemModelCreate, InventoryItemModelUpdate, string> { }

export interface IUserRepository extends IBaseRepository<UserModel, UserModelCreate, UserModelUpdate, string> {
    findByEmail(email: string): Promise<UserModel | null>
}

export interface IFinanceRepository {
    watchFinance(managerId: string): Promise<FinanceModel>;
    updateFinance(): Promise<FinanceModel>;
}
