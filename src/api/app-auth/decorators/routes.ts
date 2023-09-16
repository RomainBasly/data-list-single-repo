import 'reflect-metadata';

export function get(path: string) {
    return function(target: any, key: string, descriptor: PropertyDescriptor) {
        console.log("get decorator", target, key, descriptor)
        Reflect.defineMetadata("path", path, target, key)
    }
}