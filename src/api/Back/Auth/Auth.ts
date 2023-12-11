import assert from "assert";
import BaseApiService from "../BaseAPIService";
import { BackendError } from "@/Services/errorHandlingService";

export type ILogin = {
  email: string;
  password: string;
};

export interface ILoginResponse {
  accessToken?: string;
  refreshToken?: string;
  error?: string;
  message?: string;
}

export default class AuthApi extends BaseApiService {
  private static instance: AuthApi;
  private readonly baseURL = this.backUrl;

  private constructor() {
    super();
    AuthApi.instance = this;
  }

  public static getInstance(): AuthApi {
    if (!AuthApi.instance) {
      this.instance = new AuthApi();
    }
    return this.instance;
  }

  public async login(params: ILogin): Promise<ILoginResponse> {
    assert(this.baseURL, "missing URL inside Auth login request");
    const url = new URL(this.baseURL.concat("/auth/").concat("login"));

    try {
      return await this.postRequest<ILoginResponse>(url, params);
    } catch (error) {
      if (error instanceof Response) {
        const errorBody: BackendError = await error.json();
        throw errorBody; // Throw the entire error object
      }
      throw error;
    }
  }
}
