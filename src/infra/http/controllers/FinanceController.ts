import { Request, Response } from "express";
import { IFinanceController } from "./interfaces";
import { FinanceUsecase } from "../../../core/usecases/FinanceUsecase";
import { FinanceDtoView } from "../../../shared/dtos/FinanceDto";
import { IFinanceUsecase } from "../../../core/usecases/interfaces";

export class FinanceController implements IFinanceController {
    constructor(private financeUsecase: IFinanceUsecase) {}

    public index = async (req: Request<{userId: string}>, res: Response): Promise<Response> => {
        const { userId } = req.params;

        const finance: FinanceDtoView = await this.financeUsecase.getOne(userId);

        return res.json(finance);
    }

    public getOne = async (_req: Request, res: Response): Promise<Response> => {
        throw new Error("Method not implemented.");
    }

    public create = async (req: Request, res: Response): Promise<Response> => {
        throw new Error("Method not implemented.");
    }

    public update = async (req: Request, res: Response): Promise<Response> => {
        throw new Error("Method not implemented.");
    }
    
    public delete = async (req: Request, res: Response): Promise<Response> => {
        throw new Error("Method not implemented.");
    }
}