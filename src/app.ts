import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import { prisma } from './infra/database/prisma';
import { Routers } from './infra/http/routers';
import { LogConfig } from './infra/utils/LogConfig';
import cookieParser from 'cookie-parser';

const app = express();
 
app.use(cors());

app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        "default-src": ["'self'"],
        "script-src": ["'self'", "https://cdn.tailwindcss.com", "https://cdn.jsdelivr.net", "'unsafe-inline'"],
        "style-src": ["'self'", "https://cdn.jsdelivr.net", "'unsafe-inline'"],
        "connect-src": ["'self'", "https://cdn.jsdelivr.net"],
        "img-src": ["'self'", "data:", "blob:"],
      },
    },
  })
);

app.use(LogConfig.format());
app.use(cookieParser());
app.use(express.json());

// ROTAS DA APLICAÇÃO
const routers = new Routers(prisma);
app.use(routers.getRouter());
 
export default app;
