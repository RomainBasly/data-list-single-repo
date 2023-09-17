import "reflect-metadata";
import { AppRouter } from "../../../../src/appRouter";
import { Methods, MetadataKeys } from "./enums";
import { Request, Response, RequestHandler, NextFunction } from "express";

function bodyValidatorsCheck(keys: string): RequestHandler {
  return function (req: Request, res: Response, next: NextFunction) {
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

export function controller(routePrefix: string) {
  return function (target: Function) {
    const router = AppRouter.getInstance();

    Object.getOwnPropertyNames(target.prototype).forEach((key): void => {
      const routeHandler = target.prototype[key];
      const path: string = Reflect.getMetadata(MetadataKeys.PATH, target.prototype, key);
      const method: Methods = Reflect.getMetadata(MetadataKeys.METHOD, target.prototype, key);
      const middlewares: RequestHandler[] = Reflect.getMetadata(MetadataKeys.MIDDLEWARE, target.prototype, key) || [];
      const requiredBodyProps = Reflect.getMetadata(MetadataKeys.VALIDATOR, target.prototype, key) || [];
      const validator = bodyValidatorsCheck(requiredBodyProps);

      if (path && middlewares) {
        router[method](`${routePrefix}${path}`, ...middlewares, validator, routeHandler);
      } else if (path) {
        router[method](`${routePrefix}${path}`, routeHandler);
      }
    });
  };
}
