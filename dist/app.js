"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const axios_1 = __importDefault(require("axios"));
//import fetchData from './src/fetchLists';
const appRoutes_1 = __importDefault(require("./src/routes/appRoutes"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = 8000;
app.use(express_1.default.json());
app.use((0, cors_1.default)());
// app.get("/api/data", (req: Request, res: Response) => {
//     const data = {message: "hello world"};
//     res.json(data)
// })
// To be fixed
app.get("/my-table", async (req, res) => {
    let response;
    try {
        axios_1.default.get("https://eaepcgberfstswvqfqge.supabase.co/rest/v1/app-lists?select=*", {
            headers: {
                "apiKey": process.env.SUPABASE_SERVICE_KEY,
                "Authorization": `Bearer ${process.env.SUPABASE_SERVICE_KEY}`,
            }
        })
            .then((res) => {
            response = JSON.stringify(res.data);
            return response;
        })
            .catch((err) => { console.log(err); });
        res.send(response);
    }
    catch (error) {
        console.log(error);
    }
});
app.use(appRoutes_1.default);
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
