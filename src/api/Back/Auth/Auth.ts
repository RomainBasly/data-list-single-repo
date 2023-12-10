import assert from "assert";
import BaseApiService from "../BaseAPIService";

export type ILogin = {
  email: string;
  password: string;
};

export interface LoginResponse {
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

  public async login(params: ILogin): Promise<LoginResponse> {
    assert(this.baseURL, "missing URL inside Auth login request");
    const url = new URL(this.baseURL.concat("/auth/").concat("login"));

    try {
      const response = await this.postRequest<LoginResponse>(url, params);
      if (!response.ok) {
        throw new Error(await response.json());
      }
      return await response.json()
    } catch (error) {
      this.onError(error);
      return Promise.reject(error);
    }
  }
}
