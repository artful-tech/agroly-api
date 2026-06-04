import bcrypt from 'bcrypt';

export class HashService {
    private readonly SALT_ROUNDS = process.env.SALT_ROUNDS || 10;

    public async hash(password: string): Promise<string> {
        return await bcrypt.hash(password, this.SALT_ROUNDS);
    }

    /**
     * Compara a senha sem hash com a senha com hash
     * 
     * @template password - Senha sem hash
     * @template hash - Senha com hash
     */
    public async compare(password: string, hash: string): Promise<boolean> {
        return await bcrypt.compare(password, hash);
    }
}