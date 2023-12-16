import Image from 'next/image'

type IProps = {
  src: string
  alt: string
  className: string
  onclick?: () => void
  width: number
  height: number
}

export default function Logo(props: Readonly<IProps>) {
  return (
    <Image
      src={String(props.src)}
      alt={props.alt}
      className={props.className}
      onClick={props.onclick}
      // TODO : this following part will be erased for production
      width={300}
      height={300}
      loading="lazy"
      placeholder="blur"
    />
  )
}
