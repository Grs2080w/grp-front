import gif from "../../public/logo_animated.gif"
import Image from "next/image"

export default function Loading() {
	return (
		<div className="h-[100dvh] flex justify-center items-center bg-black">
			<Image className="w-[150px]" src={gif} alt="logo_loading"></Image>
		</div>
	)
}
