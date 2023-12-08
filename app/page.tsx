import Head from 'next/head'
import classes from './classes.module.scss'
import { Loader } from '@/components/Materials/Loader'
import { LandingHeader } from '@/components/Elements/Headers/LandingHeader'

export default function Home() {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/icon.png" />
      </Head>
      <div className={classes['root']}>
        <LandingHeader />
        <Loader />
      </div>
    </>
  )
}
