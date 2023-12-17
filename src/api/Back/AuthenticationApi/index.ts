import assert from "assert";
import BaseApiService from "../BaseAPIService";
import { BackendError } from "@/Services/ErrorHandlingService";

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

export default class AuthenticationApi extends BaseApiService {
  private static instance: AuthenticationApi;
  private readonly baseURL = this.backEndUrl;

  private constructor() {
    super();
    AuthenticationApi.instance = this;
  }

  public static getInstance(): AuthenticationApi {
    if (!AuthenticationApi.instance) {
      this.instance = new AuthenticationApi();
    }
    return this.instance;
  }

  public async login(params: ILogin): Promise<ILoginResponse> {
    assert(this.baseURL, "missing URL inside Auth login request");
    const url = new URL(this.baseURL.concat("/auth/").concat("login"));
    console.log("url", url);
    try {
      console.log("I am in the login try");
      return await this.postRequest<ILoginResponse>(url, params);
    } catch (error) {
      console.log("error", error);
      if (error instanceof Response) {
        const errorBody: BackendError = await error.json();
        throw errorBody; // Throw the entire error object
      }
      throw error;
    }
  }
}
