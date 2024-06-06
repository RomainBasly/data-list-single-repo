import assert from "assert";
import BaseApiService, { ContentType } from "../BaseAPIService";
import { BackendError } from "@/Services/errorHandlingService";

export type Cookie = {
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

  public async getListsByUser(params: Cookie) {
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

  public async getListItemsByListId(
    listId: string | string[] | undefined,
    params: any
  ) {
    assert(this.baseUrl, "Backend URL is missing");
    const url = new URL(
      this.baseUrl.concat("/lists").concat(`/get-list/${listId}`)
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

  public async addItemToList(
    listId: string | string[] | undefined,
    content: string,
    params: any
  ) {
    assert(this.baseUrl, "Backend URL is missing");
    const url = new URL(
      this.baseUrl.concat("/lists").concat(`/add-item-to-list/${listId}`)
    );

    try {
      return await this.postRequest<any>(
        url,
        { listId, content },
        {
          Cookie: params.Cookie,
        }
      );
    } catch (error) {
      if (error instanceof Response) {
        const errorBody: BackendError = await error.json();
        throw errorBody;
      }
      throw error;
    }
  }

  public async suppressItem(
    listId: string | string[] | undefined,
    elementId: string | string[] | undefined,
    params: any
  ) {
    assert(this.baseUrl, "Backend URL is missing");
    const url = new URL(
      this.baseUrl.concat("/lists").concat(`/suppress-item/`)
    );

    try {
      return await this.postRequest<any>(
        url,
        { listId, elementId },
        { Cookie: params.Cookie }
      );
    } catch (error) {
      if (error instanceof Response) {
        const errorBody: BackendError = await error.json();
        throw errorBody;
      }
      throw error;
    }
  }
}
