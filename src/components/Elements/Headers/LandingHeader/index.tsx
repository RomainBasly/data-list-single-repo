import Logo from '@/components/Materials/Logo'
import picture from '../../../../../public/images/logos/logo-big-screen.png'
import classes from './classes.module.scss'

export function LandingHeader() {
  return (
    <div className={classes['root']}>
      <Logo
        src={String(picture.src)}
        alt={'Logo'}
        className={classes['logo']}
      />
    </div>
  )
}
