import assert from "assert";

export enum ContentType {
  JSON = "application/json",
}

export default abstract class BaseApiService {
  protected readonly backUrl = process.env.NEXT_PUBLIC_BACK_URL;
  protected readonly apiKey = process.env.NEXT_PUBLIC_API_KEY;

  protected constructor() {}

  protected buildBody(body: { [key: string]: unknown }): string {
    return JSON.stringify(body);
  }

  protected async postRequest<T>(
    url: URL,
    body: { [key: string]: unknown } = {}
  ): Promise<T> {
    const response = await this.sendRequest(
      async () => await fetch(url, {
        method: "POST",
        headers: this.buildHeaders(ContentType.JSON),
        body: this.buildBody(body),
        credentials: "include", // Include cookies in the response
      })
    );
  
    if (!response.ok) {
      throw response;
    }
  
    return response.json() as Promise<T>;
  }
  

  private async sendRequest(request: () => Promise<Response>): Promise<Response> {
    return await request();
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
    assert(this.apiKey, "APIkey fucked up dude");
    if (contentType === ContentType.JSON) {
      headers.set("Content-Type", contentType);
      headers.set("X-API-KEY", this.apiKey);
    }
    return headers;
  }

  protected onError(error: unknown) {
    console.error(error);
  }
}
