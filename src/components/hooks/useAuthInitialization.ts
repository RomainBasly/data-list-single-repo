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
      console.log(
        "initializer accessToken and refreshToken",
        accessToken,
        refreshToken
      );

      if (accessToken && refreshToken) {
        console.log("I pass here 1", refreshToken);
        const isAccesTokenExpired =
          JwtService.getInstance().isTokenExpired(accessToken);
        if (isAccesTokenExpired) {
          console.log("I pass here 2", refreshToken);
          try {
            const isRefreshTokenExpired =
              JwtService.getInstance().isTokenExpired(refreshToken);
            if (!isRefreshTokenExpired) {
              console.log("I pass here in the if 3", refreshToken);
              const response = await fetch(`/api/token/getNewAccessToken`, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({ refreshToken }),
              });
              const result = await response.json();

              setAccessToken(result.accessToken);
            } else {
              console.log("I pass here in the if 4", refreshToken);
              Router.push("/login");
            }
          } catch (error) {
            console.log("I pass here in the if 5", refreshToken, error);
            Router.push("/login");
            throw error;
          }
        } else {
          setAccessToken(accessToken);
        }
      } else if (!accessToken && refreshToken) {
        console.log("I pass here in the if 6", refreshToken);
        const isRefreshTokenExpired =
          JwtService.getInstance().isTokenExpired(refreshToken);
        if (!isRefreshTokenExpired) {
          console.log("I pass here in the if 7", refreshToken);
          const response = await fetch(`/api/token/getNewAccessToken`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({ refreshToken }),
          });
          const result = await response.json();

          setAccessToken(result.accessToken);
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
