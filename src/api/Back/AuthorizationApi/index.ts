import BaseApiService from "../BaseAPIService";
import { BackendError } from "@/Services/errorHandlingService";

export type IValidation = {};

export class AuthorizationApi extends BaseApiService {
  private readonly baseURL = this.backEndUrl;
  private static instance: AuthorizationApi | null = null;

  private constructor() {
    super();
  }

  public static getInstance(): AuthorizationApi {
    if (!this.instance) {
      this.instance = new AuthorizationApi();
    }
    return this.instance;
  }

  // public async isTokenStillValid(): Promise<boolean> {
  //   try {
  //     return await this.getRequest<IValidation>(url);
  //   } catch (error) {
  //     if (error instanceof Response) {
  //       const errorBody: BackendError = await error.json();
  //       throw errorBody; // Throw the entire error object
  //     }
  //     throw error;
  //   }
  // }
}
