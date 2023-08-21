"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
//import fetchData from './src/fetchLists';
const appRoutes_1 = __importDefault(require("./src/routes/appRoutes"));
const port = 8000;
const app = (0, express_1.default)();
app.use(express_1.default.json());
// To be fixed
// app.get("/my-table", async (req: Request, res: Response) => {
//     try {
//         const data = await fetchData();
//         res.send(data ? data : "No data");
//     } catch (error) {
//         console.log(error);
//     }
// })
app.use(appRoutes_1.default);
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
