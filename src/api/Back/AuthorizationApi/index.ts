import assert from "assert";
import BaseApiService, { ContentType } from "../BaseAPIService";
import { BackendError } from "@/Services/errorHandlingService";

export type IValidation = {};
export type IGetAccessTokenParams = {};

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

  // todo : check if this is really a get method with a refresh-token as param
  public async getNewAccessToken(
    refreshToken: string
  ): Promise<{ accessToken: string }> {
    assert(this.baseURL, "url is missing in refreshToken Method");
    const url = new URL(this.baseURL.concat("/refresh-token"));

    try {
      return await this.getRequest(url, ContentType.JSON, refreshToken);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
