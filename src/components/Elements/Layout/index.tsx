import { headers } from 'next/headers'
import Header from '../Headers/TopHeader'
import SideMenu from '../SideMenu'
// import NetworkStatusNotifier from '@/components/Materials/NetworkStatusNotifier'
import dynamic from 'next/dynamic'
import classes from './classes.module.scss'

export type ILayoutProps = {
  children: React.ReactNode
  pageType?: string
}

export default function Layout({ children, pageType }: ILayoutProps) {
  const NetworkStatusNotifierWithNoSSR = dynamic(
    () => import('@/components/Materials/NetworkStatusNotifier'),
    { ssr: false }, // This disables server-side rendering for the component
  )

  const nonce = headers().get('x-nonce')
  return (
    <>
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1"
      ></meta>
      <meta name="x-nonce" content={nonce ?? 'default-nonce'} />

      {pageType !== 'login' && pageType !== 'register' && (
        <div className={classes['root']}>
          <Header className={classes['header']} />
          <SideMenu />
          <NetworkStatusNotifierWithNoSSR className={classes['footer']} />
        </div>
      )}

      {children}
    </>
  )
}
