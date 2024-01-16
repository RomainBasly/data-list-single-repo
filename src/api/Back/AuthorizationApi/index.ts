import assert from "assert";
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

  public async getNewAccessToken(): Promise<{ accessToken: string }> {
    assert(this.baseURL, "No Url inside the AUthoAPI");
    const url = new URL(this.baseURL.concat("/refresh-token"));
    try {
      return this.postRequest(url);
    } catch (error) {
      console.error("failed to refreshAccessToken", error);
      throw error;
    }
  }
}
