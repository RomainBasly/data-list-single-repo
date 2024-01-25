import LoadingMaterial from '@/components/Materials/LoadingMaterial'
import classes from './classes.module.scss'

type IProps = {
  variant?: string
  className?: string
}

export function Loader(props: IProps) {
  return (
    <div className={classes['root']}>
      <LoadingMaterial />
      {props.variant === 'page' && <p>Chargement en cours...</p>}
    </div>
  )
}
