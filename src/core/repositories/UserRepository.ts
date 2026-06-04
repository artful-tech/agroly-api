import { PrismaClient } from "@prisma/client";
import { IUserRepository } from './interfaces'
import { UserModel, UserModelCreate, UserModelUpdate } from "../models/UserModel";


export class UserRepository implements IUserRepository {
    constructor(private readonly prisma: PrismaClient) {}

    public findAll = async (): Promise<UserModel[]> => {
        return await this.prisma.user.findMany({
            where: { deletedAt: null }
        });
    }

    public findByEmail = async (email: string): Promise<UserModel | null> => {
        const user = await this.prisma.user.findUnique({
            where: { 
                email: email,
                deletedAt: null
            }
        });
        return user;
    }
    
    public findOne = async (id: string): Promise<UserModel> => {
        return this.prisma.user.findUniqueOrThrow({
            where: { 
                id: id,
                deletedAt: null
            } 
        })
    }

    public create = async (userModel: UserModelCreate): Promise<string> => {
        const userCreated = await this.prisma.user.create({
            data: userModel
        });
        return userCreated.id;
    }

    public update = async (id: string, model: UserModelUpdate): Promise<UserModel> => {
        throw new Error("Method not implemented.");
    }

    public delete = async (id: string): Promise<void> => {
        throw new Error("Method not implemented.");
    }
}