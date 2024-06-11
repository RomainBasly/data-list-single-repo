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
        const {accessToken} =
          await AuthorizationApi.getInstance().getNewAccessToken({
            Cookie: { refreshToken },
          });
          StorageService.getInstance().setCookies(
            'accessToken',
            accessToken,
            true,
          )
        return accessToken;
      } catch (error) {
        throw new Error("Failed to refresh access token");
      }
    } else {
      throw new Error("Refresh token is invalid or expired");
    }
  };

  return { refreshAccessToken };
};
