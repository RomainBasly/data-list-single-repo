import { BACK_URL } from "../config";

export enum ContentType {
  JSON = "application/json",
}

export default abstract class BaseApiService {
  protected readonly backUrl = BACK_URL;

  protected constructor() {}

  protected buildBody(body: { [key: string]: unknown }): string {
    return JSON.stringify(body);
  }

  protected async postRequest<T>(
    url: URL,
    body: { [key: string]: unknown } = {}
  ) {
    return this.sendRequest<T>(
      async () =>
        await fetch(url, {
          method: "POST",
          headers: this.buildHeaders(ContentType.JSON),
          body: this.buildBody(body),
          credentials: "include", // Include cookies
        })
    );
  }

  private async sendRequest<T>(request: () => Promise<Response>): Promise<T> {
    const response = await request();
    return this.processResponse<T>(response, request);
  }

  protected async processResponse<T>(
    response: Response,
    request: () => Promise<Response>
  ): Promise<T> {
    let responseContent: T;

    if (response.ok) {
      {
        try {
          responseContent = await response.json();
        } catch (err) {
          return Promise.reject(err);
        }
      }
    } else {
      try {
        const responseJson = await response.json();
        return Promise.reject(responseJson);
      } catch (err) {
        return Promise.reject(err);
      }
    }

    return responseContent;
  }

  protected buildHeaders(contentType: ContentType) {
    const headers = new Headers();
    if (contentType === ContentType.JSON) {
      headers.set("Content-Type", contentType);
    }
    return headers;
  }

  protected onError(error: unknown) {
    console.error(error);
  }
}
