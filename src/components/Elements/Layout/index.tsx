import { headers } from 'next/headers'
import Header from '../Headers/TopHeader'
import SideMenu from '../SideMenu'
import Cookies from 'js-cookie'

export type ILayoutProps = {
  children: React.ReactNode
  pageType?: string
}

export default function Layout({ children, pageType }: ILayoutProps) {
  // const nonce = Cookies.get('csp-nonce') || 'default-nonce'
  const nonce = headers().get('x-nonce')
  // console.log('nonce inside the layout', nonce)
  return (
    <>
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1"
      ></meta>
      <meta name="x-nonce" content={nonce ? nonce : 'default Connard'} />

      {pageType !== 'login' && pageType !== 'register' && (
        <>
          <Header />
          <SideMenu />
        </>
      )}

      {children}
    </>
  )
}
