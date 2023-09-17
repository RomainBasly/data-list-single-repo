"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.corsOptions = void 0;
const whitelist = ["http://localhost:3000", "http://localhost:8000"];
exports.corsOptions = {
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
