import Head from 'next/head'
import classes from './classes.module.scss'
import { Loader } from '@/components/Elements/Loader'
import { LandingHeader } from '@/components/Elements/Headers/LandingHeader'
import Layout from '@/components/Elements/Layout'

export default function Home() {
  return (
    <>
      <div className={classes['root']}>
        <Layout pageType="login">
          <LandingHeader />
          <Loader />
        </Layout>
      </div>
    </>
  )
}
