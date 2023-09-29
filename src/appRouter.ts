import express from "express";
import { AppAuthController } from "./api/app-auth/controllers";
import { MetadataKeys } from "./common/decorators/enums";

export class AppRouter {
  private static instance: express.Router;

  static getInstance(): express.Router {
    if (!AppRouter.instance) {
      AppRouter.instance = express.Router();
      AppRouter.registerControllerRoutes(new AppAuthController());
    }
    return this.instance;
  }

  private static registerControllerRoutes(controller: Object) {
    const prototype = Object.getPrototypeOf(controller);

    // Loop over all properties of the controller's prototype
    for (const key of Object.getOwnPropertyNames(prototype)) {
      const routeHandler = prototype[key];

      if (typeof routeHandler === "function") {
        const path = Reflect.getMetadata(MetadataKeys.PATH, prototype, key);
        const method = Reflect.getMetadata(MetadataKeys.METHOD, prototype, key);

        if (path && method) {
          const methodKey = method as keyof express.Router;
          // Register the route with the Express router
          if (typeof AppRouter.instance[methodKey] === 'function') {
            // Register the route with the Express router
            (AppRouter.instance[methodKey] as any)(path, routeHandler.bind(controller));
          }
    }
  }
}}}
