import Head from 'next/head'
import classes from './classes.module.scss'
import { Loader } from '@/components/Materials/Loader'
import { LandingHeader } from '@/components/Elements/Headers/LandingHeader'
import { NextPageContext } from 'next'
import cookie from 'cookie'
import AuthService from '@/Services/authService'

export default function Home({}) {
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

export async function getServerSideProps(context: NextPageContext) {
  const { req } = context

  const parsedCookies = cookie.parse(req?.headers.cookie || '')

  const token = parsedCookies.jwt

  const isAuthenticated = !!AuthService.getInstance().validateJWT(token)

  if (!isAuthenticated) return

  return {
    props: {
      isAuthenticated,
    },
  }
}
