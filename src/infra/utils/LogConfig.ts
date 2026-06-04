import morgan from 'morgan';
import { RouteDisplay } from './RouteDisplay';

/**
 * Gerencia os logs de requisições HTTP (Middleware Morgan).
 * Utiliza a mesma paleta de cores do RouteDisplay para consistência visual.
 */
export class LogConfig {
    /**
     * Retorna a cor baseada no status da resposta.
     */
    private static getStatusColor(status: number): string {
        const { green, yellow, red, cyan, reset } = RouteDisplay.colors;
        if (status >= 500) return red;
        if (status >= 400) return yellow;
        if (status >= 300) return cyan;
        if (status >= 200) return green;
        return reset;
    }

    /**
     * Formata o log no estilo padronizado Agrofy.
     */
    static format() {
        return morgan((tokens, req, res) => {
            const status = Number(tokens.status(req, res));
            const statusColor = this.getStatusColor(status);
            const method = tokens.method(req, res) || 'GET';
            
            // Busca a cor do método no RouteDisplay para garantir paridade
            const methodColor = RouteDisplay.methodColors[method.toUpperCase()] || RouteDisplay.colors.reset;

            const timestamp = new Date().toLocaleString('pt-BR', {
                timeZone: 'America/Sao_Paulo'
            });

            const { gray, reset, bright } = RouteDisplay.colors;

            return [
                `${gray}[${timestamp}]${reset}`,
                `${bright}${methodColor}${method.padEnd(7)}${reset}`, // Mesma cor do RouteDisplay
                `${tokens.url(req, res)}`,
                `${statusColor}${status}${reset}`,
                `${gray}${tokens['response-time'](req, res)}ms${reset}`
            ].join(' ');
        });
    }
}