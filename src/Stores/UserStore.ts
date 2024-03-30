"use client";
import assert from "assert";

export default class UserStore {
  private static instance: UserStore;
  private email: string | null = null;
  private id: string | null = null;
  public accessToken: string | null = null;
  public isOnline: boolean | null = null;

  private constructor() {}

  public static getInstance(): UserStore {
    if (!UserStore.instance) {
      UserStore.instance = new UserStore();
    }
    return UserStore.instance;
  }

  public setIsOnlineVariable(params: boolean): void {
    this.isOnline = params;
  }

  public isConnected(): boolean {
    // TODO: Do I need to set it here and fetch the localSTorage instead
    return Boolean(this.accessToken);
  }

  public setEmail(email: string): void {
    this.email = email;
    localStorage.setItem("email", email);
  }

  public setId(id: string): void {
    this.id = id;
    localStorage.setItem("id", id);
    
  }

  public getEmail(): string {
    if (!this.email) {
      const storedEmail = localStorage.getItem("email");
      assert(storedEmail, "no email in storage");
      this.email = storedEmail;
    }
    return this.email;
  }

  public getIsOnlineVariable(): boolean | null {
    return this.isOnline;
  }
}
