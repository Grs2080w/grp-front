"use client"
import { Input } from "@/components/ui/input"
import { Task } from "../services/getTasks"
import { useState } from "react"
import AddTask from "../services/addTask"
import ButtonSub from "./ButtonSub"

const styles = {
	alertError: "w-full text-center text-red-700 mb-1 font-bold",
	alertTransparent: "w-full text-center text-transparent mb-1 font-bold",
	formRow: "flex gap-2",
	button: "hover:cursor-pointer",
}

interface Props {
	setTasks: React.Dispatch<React.SetStateAction<Task[]>>
}

export default function ProfileForm({ setTasks }: Props) {
	const [title, setTitle] = useState("")
	const [alert, setAlert] = useState("")
	const [submitClicked, setSubmitClicked] = useState(false)

	function handleCapture(title: string) {
		if (title.length >= 3) {
			setAlert("")
			setSubmitClicked(false)
		}
	}

	async function OnSubmit() {
		const id = await AddTask(title) // add to server
		setTasks((tasks) => [...tasks, { description: "", id: id, status: "open", title: title, tags: [] }])
		setTitle("")
		setSubmitClicked(false)
	}

	return (
		<div>
			<div className={alert && submitClicked ? styles.alertError : styles.alertTransparent}>{alert}</div>
			<form
				action={() => {
					setSubmitClicked(true)
					if (title.length >= 3) {
						OnSubmit()
					} else if (!title.length) {
						setAlert("Title is required")
					} else {
						setAlert("Title must be at least 3 characters")
					}
				}}
				className={styles.formRow}
			>
				<Input
					value={title}
					onChange={(e) => {
						setTitle(e.target.value)
						handleCapture(e.target.value)
					}}
				/>
				<ButtonSub />
			</form>
		</div>
	)
}
