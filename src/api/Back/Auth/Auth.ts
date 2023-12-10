import assert from "assert";
import BaseApiService from "../BaseAPIService";
import { BACK_URL } from "@/api/config";

export type ILogin = {
  email: string;
  password: string;
};

export default class AuthApi extends BaseApiService {
  private static instance: AuthApi;
  private readonly baseURL = BACK_URL;

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

  public async login(params: ILogin): Promise<any> {
    assert(this.baseURL, "missing URL inside Auth login request");
    const url = new URL(this.baseURL.concat("/auth/").concat("login"));

    try {
      return await this.postRequest(url, params);
    } catch (error) {
      this.onError(error);
      return Promise.reject(error);
    }
  }
}
