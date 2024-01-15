"use client";
import assert from "assert";

export default class UserStore {
  private static instance: UserStore;
  private email: string | null = null;
  public accessToken: string | null = null;

  private constructor() {}

  public static getInstance(): UserStore {
    if (!UserStore.instance) {
      UserStore.instance = new UserStore();
    }
    return UserStore.instance;
  }

  public isConnected(): boolean {
        // Do I need to set it here and fetch the localSTorage instead
    return Boolean(this.accessToken);
  }

  public setEmail(email: string): void {
    this.email = email;
    localStorage.setItem("email", email);
  }

  public getEmail(): string {
    if (!this.email) {
      const storedEmail = localStorage.getItem("email");
      assert(storedEmail, "no email in storage");
      this.email = storedEmail;
    }
    return this.email;
  }
}
