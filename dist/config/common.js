"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.corsOptions = exports.allowedOrigins = void 0;
exports.allowedOrigins = ["http://localhost:3000", "http://localhost:8000/"];
exports.corsOptions = {
    origin: (origin, callback) => {
        if ((origin && exports.allowedOrigins.indexOf(origin) !== -1) || !origin) {
            callback(null, true);
        }
        else {
            callback(new Error("not allowed by CORS policies"), false);
        }
    },
    credentials: true,
    optionsSucessStatus: 200,
};
