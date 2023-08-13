import Image from "next/image"

type IProps = {
    src: string;
    alt: string;
    className: string;
}

export default function Logo(props: IProps) {
    return (
        <img
        src={String(props.src)}
        alt={props.alt}
      />
    )
}