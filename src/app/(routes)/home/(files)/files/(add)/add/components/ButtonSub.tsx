import { Button } from "@/components/ui/button"
import { useFormStatus } from "react-dom"

import Dots from "../../../../../../../../../public/dots.gif"
import Image from "next/image"
export default function ButtonSub() {
	const { pending } = useFormStatus()

	return (
		<Button disabled={pending} className="hover:cursor-pointer border-2" size={"lg"} type="submit">
			{pending ? <Image src={Dots} alt="3dots" width={80} height={50} /> : "Upload"}
		</Button>
	)
}
