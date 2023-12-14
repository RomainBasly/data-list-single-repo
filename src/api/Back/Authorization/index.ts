import assert from "assert";
import BaseApiService from "../BaseAPIService";

export type IisValidTokenResponse = {
  valid: boolean;
};

export class AuthorizationApi extends BaseApiService {
  private readonly URL: string = "/api/validate-jwt";
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

  public async isValidToken(): Promise<boolean | undefined> {
    assert(this.URL, "url to authorize not furnished");
    try {
      const response = await this.getRequest<IisValidTokenResponse>(this.URL);

      if (!response.ok) {
        throw new Error("Token validation failed");
      }
      console.log("response", response);
      return response.data.valid;
    } catch (error) {
      console.error("Error validating token", error);
    }
  }
}
