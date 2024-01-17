export default class StorageService {
  private static instance: StorageService;
  private constructor() {}

  public static getInstance(): StorageService {
    if (!this.instance) {
      this.instance = new StorageService();
    }
    return this.instance;
  }

  public setLocalStorage(name: string, value: string): void {
    if (!value || !name) throw new Error("Cookie name or value is empty");
    const date = new Date();

    date.setTime(date.getTime() + 3600 * 1000);

    localStorage.setItem("accessToken", value);
  }

  public getAccessToken(name: string): string | null {
    if (!localStorage.getItem(name)) {
      return null;
    }
    return localStorage.getItem(name);
  }

  // deleteCookie
}
