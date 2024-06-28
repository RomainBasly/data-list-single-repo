import Layout from '@/components/Elements/Layout'
import { LandingHeader } from '@/components/Elements/Headers/LandingHeader'
import classes from '../../login/classes.module.scss'
import PasswordCreation from '@/components/Elements/Form/PasswordCreation'

export default function AddPassword2() {
  return (
    <Layout pageType="register">
      <div className={classes['root']}>
        <div className={classes['top']}>
          <LandingHeader />
        </div>
        <div className={classes['content']}>
          <h3 className={classes['subtitle']}>Créez votre profil</h3>
          <PasswordCreation />
        </div>
      </div>
    </Layout>
  )
}
