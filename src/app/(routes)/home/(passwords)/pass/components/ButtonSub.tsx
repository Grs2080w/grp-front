import { Button } from "@/components/ui/button"
import { useFormStatus } from "react-dom"

import Dots from "../../../../../../../public/dots.gif"
import Image from "next/image"
export default function ButtonSub() {
	const { pending } = useFormStatus()

	return (
		<Button disabled={pending} className="hover:cursor-pointer border-2 mt-3" size={"lg"} type="submit">
			{pending ? <Image src={Dots} alt="3dots" width={60} height={30} /> : "Verify"}
		</Button>
	)
}
