import express, { Express, Request, Response } from "express";
import cors from "cors";
//import router from "./src/routes/appRoutes";
import { router as controllerRouter } from "./src/api/app-auth/decorators/controller"
//import hashedPassword from "./domain/common/auth/auth";
import fetchData, { ListItem } from "./src/fetchLists";
import cookieSession from 'cookie-session';
import { corsOptions } from "./config/common";

import "./src/api/app-auth/controllers"

import dotenv from "dotenv";
dotenv.config();

const app: Express = express();
const port = 8000;
app.use(cookieSession({keys: ['lalalklkljkj']}))

app.use(cors(corsOptions));

app.use(express.json());

app.get("/my-lists", async (req: Request, res: Response) => {
  const response: ListItem[] = await fetchData();
  res.send(response);
});

app.use(controllerRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
