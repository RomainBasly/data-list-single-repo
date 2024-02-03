'use client'
import classes from './classes.module.scss'
import React, { useCallback, useEffect, useState } from 'react'
import NavLink from '@/components/Materials/NavLink'
import Logo from '@/components/Materials/Logo'

import logo from '/public/images/logos/logo-big-screen.png'
import logoSmall from '/public/images/logos/logo-256x256.png'
import { Bars3Icon } from '@heroicons/react/24/solid'
import { HomeIcon, PencilIcon, XCircleIcon } from '@heroicons/react/24/outline'
import UserMenuStatus, { EOpeningState } from '@/Stores/UserMenuStatus'
import { useRouter } from 'next/navigation'

export default function Header() {
  const router = useRouter()
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

  function navigateToHome() {
    router.push('/')
  }

  return (
    <div className={classes['root']}>
      <Logo
        src={String(logo.src)}
        alt={'Logo'}
        className={classes['logo-big-screen']}
        onclick={navigateToHome}
        width={1018}
        height={374}
      />
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
        <Logo
          src={String(logoSmall.src)}
          alt={'Logo'}
          className={classes['logo-mobile']}
          onclick={navigateToHome}
          width={50}
          height={50}
        />
        <Bars3Icon
          className={classes['burger-icon']}
          onClick={toggleUserMenu}
        />
      </div>
    </div>
  )
}
