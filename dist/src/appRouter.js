"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppRouter = void 0;
const express_1 = __importDefault(require("express"));
const controllers_1 = require("./api/app-auth/controllers");
const enums_1 = require("./common/decorators/enums");
class AppRouter {
    static getInstance() {
        if (!AppRouter.instance) {
            AppRouter.instance = express_1.default.Router();
            AppRouter.registerControllerRoutes(new controllers_1.AppAuthController());
        }
        return this.instance;
    }
    static registerControllerRoutes(controller) {
        const prototype = Object.getPrototypeOf(controller);
        // Loop over all properties of the controller's prototype
        for (const key of Object.getOwnPropertyNames(prototype)) {
            const routeHandler = prototype[key];
            if (typeof routeHandler === "function") {
                const path = Reflect.getMetadata(enums_1.MetadataKeys.PATH, prototype, key);
                const method = Reflect.getMetadata(enums_1.MetadataKeys.METHOD, prototype, key);
                if (path && method) {
                    const methodKey = method;
                    // Register the route with the Express router
                    if (typeof AppRouter.instance[methodKey] === "function") {
                        // Register the route with the Express router
                        AppRouter.instance[methodKey](path, routeHandler.bind(controller));
                    }
                }
            }
        }
    }
}
exports.AppRouter = AppRouter;
