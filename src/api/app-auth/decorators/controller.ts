import "reflect-metadata";
import { AppRouter } from "../../../../src/appRouter";
import { Methods, MetadataKeys  } from "./enums";

export function controller(routePrefix: string) {
  return function (target: Function) {
    const router = AppRouter.getInstance();

    Object.getOwnPropertyNames(target.prototype).forEach((key): void => {
      const routeHandler = target.prototype[key];
      const path = Reflect.getMetadata(MetadataKeys.PATH, target.prototype, key);
      const method: Methods = Reflect.getMetadata(MetadataKeys.METHOD, target.prototype, key);

      if (path) {
        router[method](`${routePrefix}${path}`, routeHandler);
      }
    });
  };
}
