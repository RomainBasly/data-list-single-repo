import Layout from '@/components/Elements/Layout'
import Link from 'next/link'
import React from 'react'
import classes from './classes.module.scss'
import Button from '@/components/Materials/Button'
import { FolderPlusIcon } from '@heroicons/react/24/outline'

export default function Home() {
  return (
    <Layout pageType="default">
      <div className={classes['root']}>
        <h2 className={classes['title']}>Mes listes</h2>
        <Link href="/lists/create-list">
          <Button
            text={'Créer une liste'}
            className={classes['create-list-button']}
            leftIcon={<FolderPlusIcon />}
            isLoading={false}
          />
        </Link>
      </div>
    </Layout>
  )
}
