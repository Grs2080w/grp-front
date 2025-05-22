"use client"

import { useSidebar } from "@/components/ui/sidebar"

export default function UseStyleBar() {
	const { state, isMobile , open} = useSidebar()
	const stylePage = isMobile ? "bg-zinc-900 w-[88dvw] h-[calc(100dvh-200px)]" : state === "expanded" ? "bg-zinc-900 w-[calc(100vw-16rem)] h-[90dvh]" : "bg-zinc-900 w-[calc(100vw-9rem)] transition-[width] duration-320 h-[90dvh]"

	return { stylePage, isMobile, open, state }
}
