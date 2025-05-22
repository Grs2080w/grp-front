"use client"

import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Send } from "lucide-react"
import { Message } from "../services/getMessages"

import AddMessage from "../services/addMessage"

interface Props {
	messages: Message[]
	setMessages: React.Dispatch<React.SetStateAction<Message[]>>
}

export default function InputMessages({ messages, setMessages }: Props) {
	const [messageValue, setMessageValue] = useState("")

	async function SendMessage() {
		const id = await AddMessage(messageValue)
		setMessages(messages.concat({ id: id, message: messageValue, hour: new Date().toLocaleTimeString(), date: new Date().toLocaleDateString() }))
		setMessageValue("")
	}

	return (
		<div className="w-full text-center  h-[10%]">
			<form action={SendMessage}>
				<div className="flex gap-2">
					<Input
						value={messageValue}
						autoComplete="off"
						type="text"
						autoFocus={true}
						autoCapitalize="on"
						autoCorrect="on"
						onChange={(e) => {
							setMessageValue(e.target.value)
						}}
						name="message"
						placeholder="Type your Message..."
						className="w-full h-[50px]"
					/>
					<Button disabled={messageValue === ""} className="hover:cursor-pointer w-[50px] h-[50px]" type="submit">
						<Send />
					</Button>
				</div>
			</form>
		</div>
	)
}
