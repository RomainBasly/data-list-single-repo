'use client'
import classes from './classes.module.scss'
import React, { useCallback, useEffect } from 'react'
import NavLink from '../../Materials/NavLink'
import Logo from '../../Materials/Logo'

import logo from '../../../../public/images/logos/logo-big-screen.png'
import { Bars3Icon } from '@heroicons/react/24/solid'
import { HomeIcon, PencilIcon, XCircleIcon } from '@heroicons/react/24/outline'
import UserMenuStatus, { EOpeningState } from '../../../Stores/UserMenuStatus'

export default function Header() {
  const [userMenuState, setUserMenuState] = React.useState<EOpeningState>(
    UserMenuStatus.getInstance().status,
  )

  const updateStatus = useCallback((status: EOpeningState) => {
    setUserMenuState(status)
  }, [])

  useEffect(() => {
    const removeOnUserMenuStatusChange = UserMenuStatus.getInstance().onChange(
      updateStatus,
    )
    return () => {
      removeOnUserMenuStatusChange()
    }
  }, [updateStatus])

  function toggleUserMenu() {
    UserMenuStatus.getInstance().toggle()
  }

  return (
    <div className={classes['root']}>
      <Logo src={String(logo.src)} alt={'Logo'} className={classes['logo']} />
      <div className={classes['big-screen-nav-links']}>
        <NavLink
          svg={<HomeIcon />}
          className={classes['nav-link']}
          text={'Home'}
          alt={'Home Icon'}
        />
        <NavLink
          svg={<PencilIcon />}
          className={classes['nav-link']}
          text={'Créer une liste'}
          alt={'Add a list Icon'}
        />
        <NavLink
          svg={<XCircleIcon />}
          className={classes['nav-link']}
          text={'Effacer une liste'}
          alt={'Add a list Icon'}
        />
      </div>
      <div className={classes['mobile']}>
        <Bars3Icon className={classes['icon']} onClick={toggleUserMenu} />
      </div>
    </div>
  )
}
