import DefaultTemplate from '@/components/Elements/DefaultTemplate'
import Head from 'next/head'

import classes from './classes.module.scss'

export default function Home() {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/icon.png" />
      </Head>
      <div className={classes['root']}>
        <DefaultTemplate></DefaultTemplate>
      </div>
    </>
  )
}
