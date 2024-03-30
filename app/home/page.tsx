'use server'
import classes from './classes.module.scss'
import { Loader } from '@/components/Elements/Loader'
import { LandingHeader } from '@/components/Elements/Headers/LandingHeader'
import Layout from '@/components/Elements/Layout'
import Button from '@/components/Materials/Button'
import { FolderPlusIcon } from '@heroicons/react/24/solid'
import Link from 'next/link'
import SocketConnector from '@/components/Materials/SocketConnector'
import ListInvitationsApi from '@/api/Back/ListsApi'
import UserStore from '@/Stores/UserStore'
import React from 'react'
import UserIdFetcher from '../../src/components/Materials/UserIdFetcher'
import UserStoreServer from '@/Stores/UserStoreServer'
import UserInvitations from '@/components/Materials/UserInvitations'

export default async function Home() {

  //Here is the request I would like to trigger with the accessToken. How then to inject inside this request?

  return (
    <Layout pageType="default">
      <div className={classes['root']}>
        <div className={classes['title-container']}>
          <h2 className={classes['title']}>Mes listes</h2>
        </div>
        <SocketConnector />
        <UserInvitations />
        <div className={classes['redirection-button-container']}>
          <Link href="/lists/create-list">
            <Button
              text={'Créer une liste'}
              className={classes['create-list-button']}
              leftIcon={<FolderPlusIcon />}
            />
          </Link>
        </div>
      </div>
    </Layout>
  )
}
