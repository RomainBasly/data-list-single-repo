const SHORT_LIVED = 3600 * 1000; 
const LONG_LIVED = 3600 * 24 * 30 * 1000; 

export default class StorageService {
  private static instance: StorageService;
  private constructor() {}

  public static getInstance(): StorageService {
    if (!this.instance) {
      this.instance = new StorageService();
    }
    return this.instance;
  }

  public setCookies(name: string, value: string, isAccessToken: boolean): void {
    if (!value || !name) throw new Error("Cookie name or value is empty");
    let date = new Date();
    let expirationTime = isAccessToken ? date.setTime(date.getTime() + SHORT_LIVED): date.setTime(date.getTime() + LONG_LIVED);

    document.cookie =
      name + "=" + value + "; expires=" + expirationTime + "; path=/; secure;sameSite=Lax";
  }

  public getAccessToken(name: string): string | null {
    if (!localStorage.getItem(name)) {
      return null;
    }
    return localStorage.getItem(name);
  }

  // deleteCookie
}
