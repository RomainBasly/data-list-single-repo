import assert from "assert";
import BaseApiService, { ContentType } from "../BaseAPIService";
import { BackendError } from "@/Services/errorHandlingService";

export type GetLIstsParams = {
  Cookie: string;
};

export default class ListsApi extends BaseApiService {
  private static instance: ListsApi;
  private readonly baseUrl = this.backEndUrl;

  private constructor() {
    super();
  }
  public static getInstance(): ListsApi {
    if (!this.instance) {
      this.instance = new ListsApi();
    }
    return this.instance;
  }

  public async getListsByUser(params: GetLIstsParams) {
    assert(this.baseUrl, "Backend URL is missing");
    const url = new URL(
      this.baseUrl.concat("/lists").concat(`/get-user-lists`)
    );
    try {
      return await this.getRequest<any>(url, ContentType.JSON, {
        Cookie: params.Cookie,
      });
    } catch (error) {
      if (error instanceof Response) {
        const errorBody: BackendError = await error.json();
        throw errorBody;
      }
      throw error;
    }
  }
}
