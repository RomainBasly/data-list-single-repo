import express, {Express, Request, Response} from 'express';
//import fetchData from './src/fetchLists';
import router from './src/routes/appRoutes';
import hashedPassword from './domain/common/auth/auth';

const port = 8000;

const app: Express = express();

app.use(express.json());

// To be fixed
// app.get("/my-table", async (req: Request, res: Response) => {
//     try {
//         const data = await fetchData();
//         res.send(data ? data : "No data");
//     } catch (error) {
//         console.log(error);
//     }
// })


app.use(router);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})
