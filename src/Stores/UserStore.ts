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
    return Boolean(this.accessToken);
  }

  public setEmail(email: string): void {
    this.email = email;
  }

  public getEmail(): string {
    assert(this.email, "Pas de mail");
    return this.email;
  }
}
