"use client"

import { useSidebar } from "@/components/ui/sidebar"
import { PanelRightClose, PanelLeftClose, Logs } from "lucide-react"
import { useState } from "react"

const styles = {
	button: "p-2 hover:bg-gray-700 rounded-md m-1 cursor-pointer h-fit",
}

export function ButtonSideBar() {
	const [icon, setIcon] = useState<boolean>()
	const { toggleSidebar, isMobile } = useSidebar()

	function click() {
		toggleSidebar()

		if (icon) {
			setIcon(false)
		} else {
			setIcon(true)
		}
	}

	return isMobile ? (
		<button onClick={click} className={styles.button}>
			<Logs size={25} />
		</button>
	) : (
		<button onClick={click} className={styles.button}>
			{icon ? <PanelLeftClose size={25} /> : <PanelRightClose size={25} />}
		</button>
	)
}
