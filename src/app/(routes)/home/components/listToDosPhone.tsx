"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"
import { HoverCard, HoverCardTrigger, HoverCardContent } from "@/components/ui/hover-card"
import { Button } from "@/components/ui/button"

type CardItem = {
	id: string
	label: string
	href: string
	description: string
	openDelay?: number
	closeDelay?: number
}

const cardItems: CardItem[] = [
	{ id: "card-2", label: "@See your Messages", href: "/home/chat", description: "See the last messages that you sent!", openDelay: 100 },
	{ id: "card-3", label: "@Do a Task", href: "/home/tasks", description: "Do a task incomplete, have focus!", openDelay: 100 },
	{ id: "card-4", label: "@Read a Ebook", href: "/home/ebooks", description: "Read a book to run the time or just relax!", openDelay: 100 },
	{ id: "card-5", label: "@See Files", href: "/home/files", description: "See your last files added!", openDelay: 100 },
	{ id: "card-8", label: "@See your passwords", href: "/home/pass", description: "See the passwords that you added!", openDelay: 100 },
]

export default function ListToDosPhone() {
	const [openCardId, setOpenCardId] = useState<string | null>(null)

	const router = useRouter()

	return (
		<div className="flex flex-wrap justify-center">
			{cardItems.map(({ id, label, href, description, openDelay, closeDelay }) => (
				<HoverCard
					key={id}
					openDelay={openDelay}
					{...(closeDelay ? { closeDelay } : {})}
					open={openCardId === id}
					onOpenChange={(isOpen) => {
						if (isOpen) setOpenCardId(id)
						else if (openCardId === id) setOpenCardId(null)
					}}
				>
					<HoverCardTrigger asChild id={id}>
						<Button className="hover:cursor-pointer" variant="link" onClick={() => router.push(href)}>
							{label}
						</Button>
					</HoverCardTrigger>
					<HoverCardContent className="w-80 bg-zinc-800">
						<div className="flex justify-center">{description}</div>
					</HoverCardContent>
				</HoverCard>
			))}
		</div>
	)
}
