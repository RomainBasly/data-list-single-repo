import assert from "assert";
import BaseApiService, { ContentType } from "../BaseAPIService";
import { BackendError } from "@/Services/errorHandlingService";

export default class ListInvitationsApi extends BaseApiService {
  private static instance: ListInvitationsApi;
  private readonly baseUrl = this.backEndUrl;

  private constructor() {
    super();
  }
  public static getInstance(): ListInvitationsApi {
    if (!this.instance) {
      this.instance = new ListInvitationsApi();
    }
    return this.instance;
  }

  public async getInvitations(userId: string, accessToken?: string) {
    assert(this.baseUrl, "Backend URL is missing");
    const url = new URL(
      this.baseUrl
        .concat("/lists")
        .concat("/get-user-invitations/")
        .concat(userId)
    );
    try {
      return await this.getRequest<any>(url, ContentType.JSON, accessToken);
    } catch (error) {
      if (error instanceof Response) {
        const errorBody: BackendError = await error.json();
        throw errorBody;
      }
      throw error;
    }
  }
}
