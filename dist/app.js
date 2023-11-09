"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const common_1 = require("./config/common");
const protectedRoutes_1 = __importDefault(require("./src/routes/protectedRoutes"));
const publicRoutes_1 = __importDefault(require("./src/routes/publicRoutes"));
const dotenv_1 = __importDefault(require("dotenv"));
const auth_middleware_1 = require("./src/middlewares/auth-middleware");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
require("./src/api/app-auth/controllers");
require("./src/api/app-users/controllers");
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = 8000;
app.use((0, cors_1.default)(common_1.corsOptions));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
// Use the public routes
app.use(publicRoutes_1.default);
// Use the protected routes
app.use(auth_middleware_1.verifyToken);
app.use(protectedRoutes_1.default);
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
