import Header from '../Headers/TopHeader'
import SideMenu from '../SideMenu'

export type ILayoutProps = {
  children: React.ReactNode
  pageType?: string
}

export default function Layout({ children, pageType }: ILayoutProps) {
  return (
    <>
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
