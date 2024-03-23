import classes from './classes.module.scss'
import { Loader } from '@/components/Elements/Loader'
import { LandingHeader } from '@/components/Elements/Headers/LandingHeader'
import Layout from '@/components/Elements/Layout'
import Button from '@/components/Materials/Button'
import { FolderPlusIcon } from '@heroicons/react/24/solid'
import Link from 'next/link'
import SocketConnector from '@/components/Materials/SocketConnector'

export default function Home() {
  return (
    <Layout pageType="default">
      <div className={classes['root']}>
        <div className={classes['title-container']}>
          <h2 className={classes['title']}>Mes listes</h2>
        </div>
        <SocketConnector />
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
