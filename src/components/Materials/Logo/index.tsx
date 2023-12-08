import Image from 'next/image'

type IProps = {
  src: string
  alt: string
  className: string
  width: number
  height: number
}

export default function Logo(props: Readonly<IProps>) {
  return (
    <Image
      src={String(props.src)}
      alt={props.alt}
      className={props.className}
      width={props.width}
      height={props.height}
      loading="lazy"
      placeholder="blur"
    />
  )
}
