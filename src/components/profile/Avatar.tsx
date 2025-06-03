import { FaRegUser } from "react-icons/fa";

interface Props {
  imagePath: string
}

export default function Avatar(props: Props) {

    const { imagePath } = props

    return (
      <div id="avatar" className="m-auto w-fit rounded-full size-32 overflow-hidden my-2">
          {imagePath
              ? (<img src={imagePath} className="size-full"/>)
              : (<FaRegUser className="size-full" />)
          }
      </div>
    )
}