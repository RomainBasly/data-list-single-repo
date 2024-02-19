import { headers } from 'next/headers'
import Header from '../Headers/TopHeader'
import SideMenu from '../SideMenu'
import NetworkStatusNotifier from '@/components/Materials/NetworkStatusNotifier'

export type ILayoutProps = {
  children: React.ReactNode
  pageType?: string
}

export default function Layout({ children, pageType }: ILayoutProps) {
  const nonce = headers().get('x-nonce')
  return (
    <>
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1"
      ></meta>
      <meta name="x-nonce" content={nonce ?? 'default-nonce'} />

      {pageType !== 'login' && pageType !== 'register' && (
        <>
          <Header />
          <SideMenu />
          <NetworkStatusNotifier />
        </>
      )}

      {children}
    </>
  )
}
