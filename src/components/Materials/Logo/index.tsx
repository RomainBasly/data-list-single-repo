type IProps = {
  src: string
  alt: string
  className: string
}

export default function Logo(props: Readonly<IProps>) {
  return <img src={String(props.src)} alt={props.alt} />
}
