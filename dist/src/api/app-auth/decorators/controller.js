"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.controller = void 0;
require("reflect-metadata");
const appRouter_1 = require("../../../../src/appRouter");
const enums_1 = require("./enums");
function controller(routePrefix) {
    return function (target) {
        const router = appRouter_1.AppRouter.getInstance();
        Object.getOwnPropertyNames(target.prototype).forEach((key) => {
            const routeHandler = target.prototype[key];
            const path = Reflect.getMetadata(enums_1.MetadataKeys.PATH, target.prototype, key);
            const method = Reflect.getMetadata(enums_1.MetadataKeys.METHOD, target.prototype, key);
            if (path) {
                router[method](`${routePrefix}${path}`, routeHandler);
            }
        });
    };
}
exports.controller = controller;
