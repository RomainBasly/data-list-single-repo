import Image from 'next/image'

type IProps = {
  src: string
  alt: string
  className: string
  onclick?: () => void
}

export default function Logo(props: Readonly<IProps>) {
  return (
    <Image
      src={String(props.src)}
      alt={props.alt}
      className={props.className}
      onClick={props.onclick}
    />
  )
}
