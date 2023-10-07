import express from "express";
import { AppAuthController } from "./api/app-auth/controllers";
import { MetadataKeys } from "./common/decorators/enums";

export class AppRouter {
  private static instance: express.Router;

  static getInstance(): express.Router {
    if (!AppRouter.instance) {
      AppRouter.instance = express.Router();
    }
    return this.instance;
  }
}
