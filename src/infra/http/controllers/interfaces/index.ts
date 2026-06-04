import { Request, Response } from "express";


export interface IBaseController {
    index(_req: Request, res: Response): Promise<Response>
    getOne(_req: Request, res: Response): Promise<Response>
    create(req: Request, res: Response): Promise<Response>
    update(req: Request, res: Response): Promise<Response>
    delete(req: Request, res: Response): Promise<Response>
}

export interface ICropController extends IBaseController { }

export interface IFinanceController extends IBaseController { }

export interface IFarmController extends IBaseController {}

export interface IPlotController extends IBaseController {}

export interface IUserController extends IBaseController {}

export interface IFieldLogController extends IBaseController {}

export interface IIventoryItemController extends IBaseController {}

export interface IPeopleController extends IBaseController {}

export interface ISeasonController extends IBaseController {}

export interface IAuthController {
    signin(req: Request, res: Response): Promise<Response>
    signup(req: Request, res: Response): Promise<Response>
}
