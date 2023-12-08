import Logo from '@/components/Materials/Logo'
import picture from '../../../../../public/images/logos/logo-big-screen-min.png'
import classes from './classes.module.scss'

export function LandingHeader() {
  return (
    <div className={classes['root']}>
      <Logo
        src={String(picture.src)}
        alt={'Logo'}
        className={classes['logo']}
        width={1018}
        height={374}
      />
      <h3 className={classes['title']}>
        Gérez vos listes en toute simplicité!
      </h3>
    </div>
  )
}
