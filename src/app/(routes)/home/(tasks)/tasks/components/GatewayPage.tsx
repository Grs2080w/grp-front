"use client"

import UseStyleBar from "@/hooks/use-style-bar"
import Breadcrumbs from "./BreadCrumbs"
import ProfileForm from "./ProfileForm"
import ListTaks from "./ListTasks"
import { Task } from "../services/getTasks"
import { useState } from "react"
import { Separator } from "@/components/ui/separator"

const styles = {
	title: "ml-[10px] mt-[40px] font-bold text-5xl",
	container: "container py-10",
	containerMobile: "max-w-[85vw] pr-9",
	containerDesktop: "w-[calc(100vw-25rem)] mx-auto",
	separator: "my-6",
}

interface Props {
	tasksData: Task[]
}

export default function GatewayPage({ tasksData }: Props) {
	const { isMobile, stylePage } = UseStyleBar()
	const [tasks, setTasks] = useState<Task[]>(tasksData)

	return (
		<div className={`${stylePage}`}>
			<Breadcrumbs />

			<h1 className={styles.title}>Tasks</h1>

			<div className={`${styles.container} ${isMobile ? styles.containerMobile : styles.containerDesktop}`}>
				<ProfileForm setTasks={setTasks} />
				<Separator className={styles.separator} />
				<ListTaks setTasks={setTasks} tasks={tasks} />
			</div>
		</div>
	)
}
