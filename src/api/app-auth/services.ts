import jwt from 'jsonwebtoken';

export class AuthService {
  private readonly accessTokenSecret: string;

  constructor(accessTokenSecret: string) {
    this.accessTokenSecret = accessTokenSecret;
  }

  public generateAccessToken(payload: { email: string }): string {
    return jwt.sign(payload, this.accessTokenSecret, { expiresIn: "30s" });
  }
  public generateRefreshToken(payload: { email: string }): string {
    return jwt.sign(payload, this.accessTokenSecret, { expiresIn: "30s" });
  }
}
