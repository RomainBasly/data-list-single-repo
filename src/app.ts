import dotenv from 'dotenv';
dotenv.config();
import 'reflect-metadata';
import express, { Express } from 'express';
import { createServer } from 'http';
import cors from 'cors';
import { corsOptions } from './config/common';
import protectedRouter from './routes/protectedRoutes';
import publicRouter from './routes/publicRoutes';
import { corsOriginCheck, verifyRequestApiKey, verifyUserAccessToken } from './middlewares/auth-middleware';
import cookieParser from 'cookie-parser';

import './api/app-auth/controller';
import './api/app-users/controllers';
import { errorHandler } from './domain/common/errors';
import { limiter as rateIPLimiter } from './middlewares/common';
import { initContainers } from './config/tsyringe/containerConfig';
import { WebSocketClientService } from './domain/webSockets/services';

initContainers();
const app: Express = express();
const port = 8000;

app.use(corsOriginCheck);
app.use(cors(corsOptions));

app.use(rateIPLimiter);

app.set('trust proxy', 1);

app.use(express.json());
app.use(cookieParser());

app.use(verifyRequestApiKey);
// Todo implement a rateLimit for a specific route
app.use(publicRouter);

app.use('/protected', verifyUserAccessToken, protectedRouter);

app.use(errorHandler);

new WebSocketClientService('http://localhost:3001');
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
