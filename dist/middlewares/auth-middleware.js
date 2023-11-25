"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyRoles = exports.corsOriginCheck = exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const common_1 = require("../config/common");
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
const verifyToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    if (!authHeader)
        return res.sendStatus(401);
    const token = authHeader.split(" ")[1];
    if (!accessTokenSecret)
        throw new Error("no accessToken accessible in middleware (verifyToken)");
    const decodedToken = jsonwebtoken_1.default.verify(token, accessTokenSecret);
    jsonwebtoken_1.default.verify(token, accessTokenSecret, (err, decoded) => {
        if (err) {
            return res.sendStatus(403);
        }
        req.email = decodedToken.userInfo.email;
        req.roles = decodedToken.userInfo.roles;
        next();
    });
};
exports.verifyToken = verifyToken;
const corsOriginCheck = (req, res, next) => {
    const origin = req.headers.origin;
    if (origin && common_1.allowedOrigins.includes(origin)) {
        res.header("Access-Control-Allow-Credentials", "true");
    }
    next();
};
exports.corsOriginCheck = corsOriginCheck;
const verifyRoles = (...allowedRoles) => {
    return (req, res, next) => {
        if (!(req === null || req === void 0 ? void 0 : req.roles))
            return res.sendStatus(401);
        const hasSufficientRole = Object.entries(req.roles).some(([role, assigned]) => {
            return assigned && allowedRoles.includes(role);
        });
        if (!hasSufficientRole)
            return res.sendStatus(403);
        next();
    };
};
exports.verifyRoles = verifyRoles;
