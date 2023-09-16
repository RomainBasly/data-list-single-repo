"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const appRoutes_1 = __importDefault(require("./src/routes/appRoutes"));
//import hashedPassword from "./domain/common/auth/auth";
const fetchLists_1 = __importDefault(require("./src/fetchLists"));
const cookie_session_1 = __importDefault(require("cookie-session"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = 8000;
app.use((0, cookie_session_1.default)({ keys: ['lalalklkljkj'] }));
const whitelist = ["http://localhost:3000", "http://localhost:8000"];
const corsOptions = {
    origin: (origin, callback) => {
        if ((origin && whitelist.indexOf(origin) !== -1) || !origin) {
            callback(null, true);
        }
        else {
            callback(new Error("not allowed by CORS policies"), false);
        }
    },
    optionsSucessStatus: 200,
};
app.use((0, cors_1.default)(corsOptions));
app.use(express_1.default.json());
app.get("/my-lists", async (req, res) => {
    const response = await (0, fetchLists_1.default)();
    res.send(response);
});
app.use(appRoutes_1.default);
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
