import StorageService from "@/Services/CookieService";
import JwtService from "@/Services/jwtService";
import { AuthorizationApi } from "@/api/Back/AuthorizationApi";
import Cookies from "js-cookie";

export const useTokenRefresh = () => {
  const refreshAccessToken = async () => {
    const refreshToken = Cookies.get("refreshToken");
    if (
      refreshToken &&
      !JwtService.getInstance().isTokenExpired(refreshToken)
    ) {
      try {
        const response = await fetch(`/api/token/getNewAccessToken`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ refreshToken }),
        });
        const result = await response.json();
        return result.accessToken;
      } catch (error) {
        throw new Error("Failed to refresh access token");
      }
    } else {
      throw new Error("Refresh token is invalid or expired");
    }
  };

  return { refreshAccessToken };
};
