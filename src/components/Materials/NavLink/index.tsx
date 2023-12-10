import classes from './classes.module.scss'

type IProps = {
  svg: React.ReactElement
  className?: string
  text: string
  alt: string
}

export default function NavLink(props: IProps) {
  return (
    <div className={classes['root']}>
      <div className={classes['svg']}>{props.svg}</div>
      <div className={classes['text']}>{props.text}</div>
    </div>
  )
}
