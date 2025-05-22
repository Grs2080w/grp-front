"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export type Task = {
	description: string
	id: string
	status: string
	title: string
	tags: string[]
}

export default async function GetTasks() {
	const cookiesS = await cookies()

	const token = cookiesS.get(process.env.NEXT_NAME_SERVER + "authtoken")?.value

	if (!token) {
		redirect(`/login`)
	}

	const response = await fetch(process.env.NEXT_PUBLIC_API_URL + `/api/tasks`, {
		cache: "force-cache",
		method: "GET",
		headers: {
			Authorization: "Bearer " + token,
		},
	}).then((res) => res.json())

	if (response?.error) {
		console.log(response)
		return []
	}

	if (!response) {
		return []
	}

	return response as Task[]
}
