import assert from "assert";
import BaseApiService, { ContentType } from "../BaseAPIService";
import { BackendError } from "@/Services/errorHandlingService";
import { IBeneficiary } from "@/components/Materials/UserLists/ListPage";

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
    beneficiaries: IBeneficiary[],
    params: any
  ) {
    assert(this.baseUrl, "Backend URL is missing");
    const url = new URL(
      this.baseUrl.concat("/lists").concat(`/add-item-to-list/`)
    );

    try {
      return await this.postRequest<any>(
        url,
        { listId, content, beneficiaries },
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
    beneficiaries: IBeneficiary[],
    params: any
  ) {
    assert(this.baseUrl, "Backend URL is missing");
    const url = new URL(
      this.baseUrl.concat("/lists").concat(`/suppress-item/`)
    );

    try {
      return await this.postRequest<any>(
        url,
        { listId, elementId, beneficiaries },
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
  public async handleItemStatusChange(
    listId: string | string[] | undefined,
    elementId: string | string[] | undefined,
    status: boolean,
    beneficiaries: IBeneficiary[],
    params: any
  ) {
    assert(this.baseUrl, "Backend URL is missing");
    const url = new URL(
      this.baseUrl.concat("/lists").concat(`/change-item-status/`)
    );

    try {
      return await this.postRequest<any>(
        url,
        { listId, elementId, status, beneficiaries },
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
  public async handleItemContentChange(
    listId: string | string[] | undefined,
    elementId: string | string[] | undefined,
    contentUpdated: string,
    beneficiaries: IBeneficiary[],
    params: any
  ) {
    assert(this.baseUrl, "Backend URL is missing");
    const url = new URL(
      this.baseUrl.concat("/lists").concat(`/update-list-content/`)
    );

    try {
      return await this.postRequest<any>(
        url,
        { listId, elementId, content: contentUpdated, beneficiaries },
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

  public async createList(
    listName: string,
    emails: string[],
    thematic: string,
    accessLevel: string,
    description: string,
    cyphered: boolean,
    params: any
  ) {
    assert(this.baseUrl, "Backend URL is missing");
    const url = new URL(this.baseUrl.concat("/lists").concat(`/create-list/`));

    try {
      return await this.postRequest<any>(
        url,
        { listName, emails, thematic, accessLevel, description, cyphered },
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
