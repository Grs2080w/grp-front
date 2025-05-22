"use client"

import { Delete } from "lucide-react"
import { Message } from "../services/getMessages"
import { ContextMenu, ContextMenuTrigger, ContextMenuContent, ContextMenuItem } from "@/components/ui/context-menu"
import { useEffect, useRef, useTransition } from "react"
import { ScrollArea } from "@/components/ui/scroll-area"
import DeleteMessage from "../services/deleteMessage"
import { toast } from "sonner"

interface Props {
	data: Message[]
	setData: React.Dispatch<React.SetStateAction<Message[]>>
}

const styles = {
	container: "w-full text-right h-[90%] flex flex-col justify-end items-end",
	scrollArea: "w-full text-right h-[90%] flex flex-col justify-end items-end",
	messageContainer: "w-fit max-w-[90vw] p-3 m-1 bg-slate-500 rounded-lg flex justify-end items-center",
	link: "text-[15px] text-gray-800 hover:underline hover:text-gray-700 active:text-gray-950 font-bold max-w-[40vw] wrap-anywhere",
	hour: "ml-2 text-[10px] h-full flex items-end justify-center font-bold",
	menuItem: "flex items-center justify-between hover:cursor-pointer",
}

export default function ListMessages({ data, setData }: Props) {
	const endOfMessagesRef = useRef<HTMLDivElement>(null)
	const [, startTransition] = useTransition()

	useEffect(() => {
		const viewport = endOfMessagesRef.current?.querySelector<HTMLElement>("[data-radix-scroll-area-viewport]")
		if (viewport) viewport.scrollTop = viewport.scrollHeight
	}, [data])

	if (!data) data = []

	const handleDelete = async (id: string) => {
		startTransition(() => {
			setData((prev) => prev.filter((m) => m.id !== id))
		})

		toast.promise(DeleteMessage(id), {
			loading: "Deleting...",
			success: "Message deleted",
			error: "Error deleting message",
		})
	}

	return (
		<div className={styles.container}>
			<ScrollArea ref={endOfMessagesRef} className={styles.scrollArea}>
				<div className={styles.container}>
					{data.map((message) => {
						const isLink = message.message.startsWith("http://") || message.message.startsWith("https://")

						return (
							<ContextMenu key={message.id}>
								<ContextMenuTrigger>
									<div className={styles.messageContainer}>
										{isLink ? (
											<a href={message.message} target="_blank" rel="noreferrer" className={styles.link}>
												{message.message}
											</a>
										) : (
											message.message
										)}
										<div className={styles.hour}>{message.hour.substring(0, 5)}</div>
									</div>
								</ContextMenuTrigger>
								<ContextMenuContent onCloseAutoFocus={(e) => e.preventDefault()}>
									<ContextMenuItem
										variant="destructive"
										className={styles.menuItem}
										onSelect={async () => {
											await handleDelete(message.id)
										}}
									>
										Delete <Delete />
									</ContextMenuItem>
								</ContextMenuContent>
							</ContextMenu>
						)
					})}
				</div>
			</ScrollArea>
		</div>
	)
}
