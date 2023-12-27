import dotenv from "dotenv";
dotenv.config();
import "reflect-metadata";
import express, { Express } from "express";
import cors from "cors";
import { corsOptions } from "./config/common";
import protectedRouter from "./routes/protectedRoutes";
import publicRouter from "./routes/publicRoutes";
import { corsOriginCheck, verifyRequestApiKey, verifyUserAccessToken } from "./middlewares/auth-middleware";
import cookieParser from "cookie-parser";

import "./api/app-auth/controller";
import "./api/app-users/controllers";
import { errorHandler } from "./domain/common/errors";
import { limiter as rateIPLimiter } from "./middlewares/common";
import { initContainers } from "./config/tsyringe/containerConfig";

initContainers();
const app: Express = express();
const port = 8000;

app.use(corsOriginCheck);
app.use(cors(corsOptions));

app.use(rateIPLimiter);

// this in case the provider uses reversed proxy
app.set("trust proxy", 1);

app.use(express.json());
app.use(cookieParser());

app.use(verifyRequestApiKey);
app.use(publicRouter);

app.use("protected", verifyUserAccessToken, protectedRouter);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
