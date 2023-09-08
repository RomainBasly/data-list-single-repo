import express, {Express, Request, Response} from 'express';
import cors from 'cors';
import axios from 'axios';
//import fetchData from './src/fetchLists';
import router from './src/routes/appRoutes';
import hashedPassword from './domain/common/auth/auth';
import fetchData, { ListItem } from './src/fetchLists';

import dotenv from "dotenv";
dotenv.config();

const app: Express = express();
const port = 8000;

app.use(express.json());

app.use(cors());
// app.get("/api/data", (req: Request, res: Response) => {
//     const data = {message: "hello world"};
//     res.json(data)
// })

// To be fixed
// app.get("/my-lists", async (req: Request, res: Response) => {
//     let response;
//     try {
//         axios.get("https://eaepcgberfstswvqfqge.supabase.co/rest/v1/app-lists?select=*", {
//             headers: {
//                 "apiKey" : process.env.SUPABASE_SERVICE_KEY,
//                 "Authorization": `Bearer ${process.env.SUPABASE_SERVICE_KEY}`,
//         }})
//         .then((res) => {
//             response = JSON.stringify(res.data)
//             return response})
//         .catch((err) => {console.log(err)})
//         res.send(response)
//     } catch (error) {
//         console.log(error);
//     }
// })

app.get("/my-lists", async (req: Request, res: Response) => {
    const response: ListItem[] = await fetchData();
    res.send(response);
})

app.use(router);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})
