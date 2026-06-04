import jwt, { SignOptions } from 'jsonwebtoken';
import { AppError } from '../../core/errors/AppError';

interface ITokenPayload {
    sub: string;
    iat: number;
    exp: number;
}

export class TokenService {
    private readonly secret: string;
    private readonly expiresIn: string;

    constructor() {
        this.secret = process.env.JWT_SECRET || 'agrofy-secret-key-default';
        this.expiresIn = process.env.JWT_EXPIRES_IN || '1d';
    }

    /**
     * Gera um novo token JWT
     * @param userId Usuário que será associado ao token
     */
    public generate(userId: string): string {
        const options: SignOptions = {
            subject: userId,
            expiresIn: this.expiresIn as any
        };

        return jwt.sign({}, this.secret, options);
    }

    public validate(token: string): string {
        try {
            const decoded = jwt.verify(token, this.secret) as ITokenPayload;
            return decoded.sub;
        } catch (error) {
            throw new AppError('Token inválido ou expirado', 401);
        }
    }
}