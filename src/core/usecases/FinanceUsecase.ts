import { FinanceDtoView } from "../../shared/dtos/FinanceDto";
import { FinanceMapper } from "../models/FinanceModel";
import { IFinanceRepository } from "../repositories/interfaces";

import { IFinanceUsecase } from "./interfaces";

export class FinanceUsecase implements IFinanceUsecase {
    constructor(private financeRepository: IFinanceRepository) {}

    public getAll = async (): Promise<FinanceDtoView[]> => {
        throw new Error("Method not implemented.");
    }

    public getOne = async (id: string): Promise<FinanceDtoView> => {
        const finance = await this.financeRepository.watchFinance(id);
        return FinanceMapper.toView(finance);
    }

    public create = async (createDto: any): Promise<string> => {
        throw new Error("Method not implemented.");
    }

    public update = async (updateDto: any): Promise<FinanceDtoView> => {
        throw new Error("Method not implemented.");
    }
    
    public delete = async (): Promise<void> => {
        throw new Error("Method not implemented.");
    }
    
}