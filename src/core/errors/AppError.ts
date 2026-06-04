export class AppError {
    public readonly message: string;
    public readonly status: string;
    public readonly statusCode: number;

    constructor(message: string, statusCode = 400, status = 'error') {
        this.message = message;
        this.statusCode = statusCode;
        this.status = status;
    }
}