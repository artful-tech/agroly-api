import { HashService } from "../../infra/services/HashService";
import { UserDtoCreate, UserDtoView } from "../../shared/dtos/UserDto";
import { AppError } from "../errors/AppError";
import { UserMapper } from "../models/UserModel";
import { IUserRepository } from "../repositories/interfaces";
import { IUserUsecase } from "./interfaces";

export class UserUsecase implements IUserUsecase {
    constructor(private userRepository: IUserRepository) {}
    
    public getAll = async (): Promise<UserDtoView[]> => {
        const users = await this.userRepository.findAll();

        if (!users) {
            return [];
        }

        return UserMapper.toView(users);
    }

    public getByEmail = async (email: string): Promise<UserDtoView> => {
        const userModel = await this.userRepository.findByEmail(email);
        if (!userModel) {
            throw new AppError('Usuário não encontrado', 409);
        }
        return UserMapper.toView(userModel);
    }

    public getOne = async (id: string): Promise<UserDtoView> => {
        throw new Error("Method not implemented.");
    }

    public create = async (createDto: UserDtoCreate): Promise<string> => {
        throw new Error("Method not implemented.");
    }

    public update = async (updateDto: { email: string; actualPassword: string; newPassword: string; newConfirmPassword: string; }): Promise<UserDtoView> => {
        throw new Error("Method not implemented.");
    }

    public delete = async (): Promise<void> => {
        throw new Error("Method not implemented.");
    }
}