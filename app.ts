import express, {Express, Request, Response} from 'express';
import fetchData from './src/fetchLists';
import router from './src/routes/appRoutes';

const port = 8000;

const app: Express = express();

// To be fixed
app.get("/my-table", async (req: Request, res: Response) => {
    try {
        const data = await fetchData();
        res.send(data);
    } catch (error) {
        console.log(error);
    }
})


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})

app.use(router);