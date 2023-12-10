import dotenv from "dotenv";
dotenv.config();
import "reflect-metadata";
import express, { Express } from "express";
import cors from "cors";
import { corsOptions } from "./config/common";
import protectedRouter from "./routes/protectedRoutes";
import publicRouter from "./routes/publicRoutes";
import { corsOriginCheck, verifyToken } from "./middlewares/auth-middleware";
import cookieParser from "cookie-parser";

import "./api/app-auth/controller";
import "./api/app-users/controllers";
import { errorHandler } from "./domain/common/errors";

const app: Express = express();
const port = 8000;

app.use(corsOriginCheck);
app.use(cors(corsOptions));

app.use(express.json());
app.use(cookieParser());

// Use the public routes
app.use(publicRouter);

// Use the protected routes
app.use("protected", verifyToken, protectedRouter);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
