import React from 'react'
import Header from '../Header'
import SideMenu from '../SideMenu'
import classes from './classes.module.scss'

export default function DefaultTemplate({
  children,
}: {
  children?: React.ReactNode
}): React.JSX.Element {
  return (
    <div className={classes['root']}>
      <Header />
      <SideMenu />
      <main>{children}</main>
    </div>
  )
}
