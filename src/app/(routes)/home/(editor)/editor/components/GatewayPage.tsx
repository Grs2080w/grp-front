"use client"

import UseStyleBar from "@/hooks/use-style-bar"
import EditorComponent from "./Editor"

export default function GatewayPage() {
	const { open } = UseStyleBar()

	const className = open ? "max-w-[85vw] w-[70vw] pr-9 mx-auto m-1 ml-[calc(9vw-30px)] h-[60vh] mt-5" : "w-[calc(100vw-7vw)] ml-[calc(2.5vw-30px)] m-1 h-[60vh]"

	return (
		<div className={className}>
			<EditorComponent />
		</div>
	)
}
