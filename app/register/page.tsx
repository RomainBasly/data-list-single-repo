import RegistrationForm from '@/components/Elements/Form/Registration'
import { LandingHeader } from '@/components/Elements/Headers/LandingHeader'
import Layout from '@/components/Elements/Layout'
import classes from '../login/classes.module.scss'

export default function Register() {
  return (
    <Layout pageType="register">
      <div className={classes['root']}>
        <div className={classes['top']}>
          <LandingHeader />
        </div>
        <div className={classes['content']}>
          <h2 className={classes['title']}>Bienvenue!</h2>
          <h3 className={classes['subtitle']}>S'enregistrer</h3>
          <RegistrationForm />
        </div>
      </div>
    </Layout>
  )
}
