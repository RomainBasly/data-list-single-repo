import StorageService from '@/Services/CookieService'
import JwtService from '@/Services/jwtService'
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'

const useTokenService = () => {
  const Router = useRouter()

  const checkAndRefreshAccessToken = async () => {
    const accessToken = Cookies.get('accessToken')
    const refreshToken = Cookies.get('refreshToken')

    console.log('accessToken from checkAndRefresh', accessToken)
    console.log('refreshToken from checkAndRefresh', refreshToken)

    if (!refreshToken) {
      Router.push('/login')
      return null
    }

    if (accessToken && !JwtService.getInstance().isTokenExpired(accessToken)) {
      return accessToken
    }

    const isRefreshTokenExpired = JwtService.getInstance().isTokenExpired(
      refreshToken,
    )
    if (isRefreshTokenExpired) {
      Router.push('/login')
      return null
    }

    try {
      const response = await fetch(`/api/token/getNewAccessToken`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ refreshToken }),
      })
      const result = await response.json()
      console.log('result', result, result.accessToken.accessToken)

      StorageService.getInstance().setCookies(
        'accessToken',
        result.accessToken.accessToken,
        true,
      )
      return result.accessToken.accessToken
    } catch (error) {
      Router.push('/login')
      throw error
    }
  }
  return { checkAndRefreshAccessToken }
}

export default useTokenService
