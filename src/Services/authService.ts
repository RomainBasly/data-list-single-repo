export default class AuthService {
  public accessToken: string | null = null;
  private static instance: AuthService | null = null;
  private _isAuthenticated: boolean = false;

  private constructor() {}

  public getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  public setToken(token: string) {

  }
  
  public isAuthenticated() {
    return this._isAuthenticated;
  }

  public logout() {
    this._isAuthenticated = false;
  }
}
