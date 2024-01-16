export default class CookieService {
  private static instance: CookieService;
  private constructor() {}

  public static getInstance(): CookieService {
    if (!this.instance) {
      this.instance = new CookieService();
    }
    return this.instance;
  }

  // public setCookie(name: string, value: string): void {
  //   if (!value || !name) throw new Error("Cookie name or value is empty");
  //   const date = new Date();

<<<<<<< Updated upstream
  //   date.setTime(date.getTime() + 3600 * 1000 * 24);

  //   document.cookie =
  //     name + "=" + value + "; expires=" + date.toUTCString() + "; path=/";
  // }
=======
    date.setTime(date.getTime() + 3600 * 1000);

    document.cookie =
      name + "=" + value + "; expires=" + date.toUTCString() + "; path=/";
    console.log("set cookie", document.cookie);
  }
>>>>>>> Stashed changes

  public getCookie(): string {
    return document.cookie;
  }

  // deleteCookie
}
