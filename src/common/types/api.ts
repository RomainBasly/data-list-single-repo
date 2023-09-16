import { Request, Response } from "express";

export interface RequestWithBody extends Request {
  body: { [key: string]: string | undefined };
}
export interface ResponseWithBody extends Response {
    params: {[key: string]: string}
}
