export default class CookieService {
  private static instance: CookieService;
  private constructor() {}

  public static getInstance(): CookieService {
    if (!this.instance) {
      this.instance = new CookieService();
    }
    return this.instance;
  }

  public setCookie(name: string, value: string): void {
    if (!value || !name) throw new Error("Cookie name or value is empty");
    const date = new Date();

    date.setTime(date.getTime() + 3600 * 1000);

    document.cookie =
      name + "=" + value + "; expires=" + date.toUTCString() + "path=/";
  }

  // getCookie

  // deleteCookie
}
