"use client";

export default class UserStore {
    private static instance: UserStore;
    public accessToken: string | null = null;

    private constructor() {}

    public getInstance(): UserStore {
        if (!UserStore.instance) return new UserStore();
        return UserStore.instance;
    }

    public isConnected(): boolean {
        return Boolean(this.accessToken)
    }
}