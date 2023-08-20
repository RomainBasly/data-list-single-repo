"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const fetchLists_1 = __importDefault(require("./src/fetchLists"));
const appRoutes_1 = __importDefault(require("./src/routes/appRoutes"));
const port = 8000;
const app = (0, express_1.default)();
// To be fixed
app.get("/my-table", async (req, res) => {
    try {
        const data = await (0, fetchLists_1.default)();
        res.send(data);
    }
    catch (error) {
        console.log(error);
    }
});
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
app.use(appRoutes_1.default);
