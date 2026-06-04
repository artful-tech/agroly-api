import { IUserRepository } from "../repositories/interfaces";
import { HashService } from "../../infra/services/HashService";
import { UserMapper, UserModel, UserModelCreate } from "../models/UserModel";
import { TokenService } from "../../infra/services/TokenService";
import { AppError } from "../errors/AppError";
import { IAuthUsecase } from "./interfaces";
import { UserDtoCreate } from "../../shared/dtos/UserDto";

export class AuthUsecase implements IAuthUsecase {
    constructor(
        private readonly userRepository: IUserRepository,
        private readonly hashService: HashService,
        private readonly tokenService: TokenService
    ) { }

    public signin = async (email: string, password: string): Promise<string> => {
        const user = await this.userRepository.findByEmail(email);

        if (user) {
            const isSamePassword: boolean = await this.hashService.compare(password, user.password)

            if (isSamePassword) {
                return this.tokenService.generate(user.id);
            }
        }

        throw new AppError('Credenciais inválidas', 401, 'no_authorization');
    }

    public signup = async (createDto: UserDtoCreate): Promise<string> => {
        const hashedPassword: string = await this.hashService.hash(createDto.password);
        const userModelCreate: UserModelCreate = UserMapper.fromCreateDtoToInput(createDto);

        userModelCreate.password = hashedPassword;

        const user = await this.userRepository.findByEmail(userModelCreate.email);

        if (user) {
            throw new AppError('Erro na criação do usuário', 409);
        }
        
        return await this.userRepository.create(userModelCreate);
    }
}