"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
//import router from "./src/routes/appRoutes";
//import hashedPassword from "./domain/common/auth/auth";
const fetchLists_1 = __importDefault(require("./src/fetchLists"));
const cookie_session_1 = __importDefault(require("cookie-session"));
const common_1 = require("./config/common");
require("./src/api/app-auth/controllers");
require("./src/api/app-users/controllers");
const dotenv_1 = __importDefault(require("dotenv"));
const appRouter_1 = require("./src/appRouter");
const services_1 = require("./src/api/app-auth/services");
const controllers_1 = require("./src/api/app-auth/controllers");
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = 8000;
app.use((0, cookie_session_1.default)({ keys: ['lalalklkljkj'] }));
app.use((0, cors_1.default)(common_1.corsOptions));
app.use(express_1.default.json());
const authService = new services_1.AuthService(String(process.env.ACCESS_TOKEN_SECRET));
const appAuthController = new controllers_1.AppAuthController(authService);
app.get("/my-lists", async (req, res) => {
    const response = await (0, fetchLists_1.default)();
    res.send(response);
});
app.use(appRouter_1.AppRouter.getInstance());
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
