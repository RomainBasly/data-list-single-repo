import Header from '../Headers/TopHeader'
import SideMenu from '../SideMenu'

export type ILayoutProps = {
  children: React.ReactNode
  pageType?: string
}

export default function Layout({ children, pageType }: ILayoutProps) {
  return (
    <>
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1"
      ></meta>
      <meta
            httpEquiv="Content-Security-Policy"
            content="
              default-src 'self';
              script-src 'self';
              style-src 'self' 'unsafe-inline' fonts.googleapis.com;
              font-src 'self' fonts.gstatic.com;
              img-src 'self' data:;
              connect-src 'self' https://stingray-app-69yxe.ondigitalocean.app;
            "
          />
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
