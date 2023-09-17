"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.controller = void 0;
require("reflect-metadata");
const appRouter_1 = require("../../appRouter");
const enums_1 = require("./enums");
function bodyValidatorsCheck(keys) {
    return function (req, res, next) {
        if (!req.body) {
            res.status(422).send("Invalid request");
            return;
        }
        for (let key of keys) {
            if (!req.body[key]) {
                res.status(422).send("Invalid request");
                return;
            }
        }
        next();
    };
}
function controller(routePrefix) {
    return function (target) {
        const router = appRouter_1.AppRouter.getInstance();
        Object.getOwnPropertyNames(target.prototype).forEach((key) => {
            const routeHandler = target.prototype[key];
            const path = Reflect.getMetadata(enums_1.MetadataKeys.PATH, target.prototype, key);
            const method = Reflect.getMetadata(enums_1.MetadataKeys.METHOD, target.prototype, key);
            const middlewares = Reflect.getMetadata(enums_1.MetadataKeys.MIDDLEWARE, target.prototype, key) || [];
            const requiredBodyProps = Reflect.getMetadata(enums_1.MetadataKeys.VALIDATOR, target.prototype, key) || [];
            const validator = bodyValidatorsCheck(requiredBodyProps);
            if (path && middlewares) {
                router[method](`${routePrefix}${path}`, ...middlewares, validator, routeHandler);
            }
            else if (path) {
                router[method](`${routePrefix}${path}`, routeHandler);
            }
        });
    };
}
exports.controller = controller;
