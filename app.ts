import express, { Express, Request, Response } from "express";
import cors from "cors";
//import router from "./src/routes/appRoutes";
//import hashedPassword from "./domain/common/auth/auth";
import fetchData, { ListItem } from "./src/fetchLists";
import cookieSession from 'cookie-session';
import { corsOptions } from "./config/common";

import "./src/api/app-auth/controllers"

import dotenv from "dotenv";
import { AppRouter } from "./src/appRouter";
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

app.use(AppRouter.getInstance());

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
