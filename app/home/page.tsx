import Layout from '@/components/Elements/Layout'
import Link from 'next/link'
import React from 'react'
import classes from './classes.module.scss'
import Button from '@/components/Materials/Button'
import { FolderPlusIcon } from '@heroicons/react/24/outline'
import { ArrowRightIcon } from '@heroicons/react/24/solid'

export default function Home() {
  return (
    <Layout pageType="default">
      <div className={classes['root']}>
        <div className={classes['title-container']}>
          <h2 className={classes['title']}>Mes listes</h2>
          {/* <ListBulletIcon /> */}
        </div>
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
