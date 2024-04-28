"use client";
import JwtService from "@/Services/jwtService";
import { AuthorizationApi } from "@/api/Back/AuthorizationApi";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export const useAuthInitialization = () => {
  const Router = useRouter();
  const [accessToken, setAccessToken] = useState<string | null>(null);

  useEffect(() => {
    const initializeAuth = async () => {
      const accessToken = Cookies.get("accessToken");
      const refreshToken = Cookies.get("refreshToken");

      if (accessToken && refreshToken) {
        const isAccesTokenExpired =
          JwtService.getInstance().isTokenExpired(accessToken);
        if (isAccesTokenExpired) {
          try {
            const isRefreshTokenExpired =
              JwtService.getInstance().isTokenExpired(refreshToken);
            if (!isRefreshTokenExpired) {
              const newAccessToken =
                await AuthorizationApi.getInstance().getNewAccessToken({
                  Cookie: { refreshToken },
                });
              setAccessToken(newAccessToken.accessToken);
            } else {
              Router.push("/login");
            }
          } catch (error) {
            Router.push("/login");
            throw error;
          }
        } else {
          setAccessToken(accessToken);
        }
      } else if (!accessToken && refreshToken) {
        const isRefreshTokenExpired =
          JwtService.getInstance().isTokenExpired(refreshToken);
        if (!isRefreshTokenExpired) {
          const newAccessToken =
            await AuthorizationApi.getInstance().getNewAccessToken({
              Cookie: { refreshToken },
            });
          setAccessToken(newAccessToken.accessToken);
        } else {
          Router.push("/login");
        }
      } else {
        Router.push("/login");
      }
    };
    initializeAuth();
  }, [Router]);

  return { accessToken };
};


