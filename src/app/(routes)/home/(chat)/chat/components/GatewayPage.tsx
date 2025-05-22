"use client"

import UseStyleBar from "@/hooks/use-style-bar"
import Breadcrumbs from "./Breadcrumbs"
import ListMessages from "./ListMessages"
import InputMessages from "./InputMessages"
import { Message } from "../services/getMessages"
import { useState } from "react"

interface Props {
	data: Message[]
}

export default function GatewayPage({ data }: Props) {
	const { stylePage } = UseStyleBar()
	const [messages, setMessages] = useState<Message[]>(data ?? [])

	return (
		<div className={stylePage}>
			<Breadcrumbs />

			<h1 className="ml-[10px] mt-[40px] font-bold text-5xl mb-5">Chat</h1>

			<div className="flex flex-wrap gap-3 w-full justify-center items-center h-[calc(100vh-200px)] pr-[40px]">
				<ListMessages data={messages} setData={setMessages} />
				<InputMessages messages={messages} setMessages={setMessages} />
			</div>
		</div>
	)
}
