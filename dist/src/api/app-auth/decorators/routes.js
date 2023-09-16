"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.get = void 0;
require("reflect-metadata");
function get(path) {
    return function (target, key, descriptor) {
        console.log("get decorator", target, key, descriptor);
        Reflect.defineMetadata("path", path, target, key);
    };
}
exports.get = get;
