import { Router } from "express";

/**
 * Utilitário para escaneamento e exibição visual de rotas.
 * Padronizado com as cores globais da Agrofy-API.
 */
export class RouteDisplay {
    public static readonly colors = {
        reset: "\x1b[0m",
        bright: "\x1b[1m",
        green: "\x1b[32m",
        cyan: "\x1b[36m",
        yellow: "\x1b[33m",
        red: "\x1b[31m",
        magenta: "\x1b[35m",
        gray: "\x1b[90m"
    };

    public static readonly methodColors: Record<string, string> = {
        GET: "\x1b[32m",    // green
        POST: "\x1b[36m",   // cyan
        PATCH: "\x1b[33m",  // yellow
        DELETE: "\x1b[31m", // red
        PUT: "\x1b[35m"     // magenta
    };

    static scan(router: Router, basePath: string) {
        const cleanBase = basePath.endsWith('/') ? basePath.slice(0, -1) : basePath;

        if (!router.stack) return;

        router.stack.forEach((layer: any) => {
            if (layer.route) {
                const path = layer.route.path;
                const methods = Object.keys(layer.route.methods).map(m => m.toUpperCase());

                methods.forEach(method => {
                    const color = RouteDisplay.methodColors[method] || RouteDisplay.colors.reset;
                    const { reset, gray, bright, cyan } = RouteDisplay.colors;

                    const formattedMethod = method.padEnd(7, ' ');
                    const fullPath = `${cleanBase}${path === '/' ? '' : path}`.replace(/\/+/g, '/');

                    console.log(
                        `${gray}[ROUTE]${reset} ` +
                        `${bright}${color}${formattedMethod}${reset} ` +
                        `${cyan}${fullPath}${reset}`
                    );
                });
            }
        });
    }
}