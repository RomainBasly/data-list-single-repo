"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_session_1 = __importDefault(require("cookie-session"));
const common_1 = require("./config/common");
const appRoutes_1 = __importDefault(require("./src/routes/appRoutes"));
require("./src/api/app-auth/controllers");
require("./src/api/app-users/controllers");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = 8000;
app.use((0, cookie_session_1.default)({ keys: ['lalalklkljkj'] }));
app.use((0, cors_1.default)(common_1.corsOptions));
app.use(express_1.default.json());
app.use(appRoutes_1.default);
// app.get("/my-lists", async (req: Request, res: Response) => {
//   const response: ListItem[] = await fetchData();
//   res.send(response);
// });
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
