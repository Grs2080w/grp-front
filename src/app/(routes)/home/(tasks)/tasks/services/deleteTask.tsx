"use server"

import { revalidatePath } from "next/cache"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export default async function DeleteTasks(id: string) {
	const cookiesS = await cookies()

	const token = cookiesS.get(process.env.NEXT_NAME_SERVER + "authtoken")?.value

	if (!token) {
		redirect(`/login`)
	}

	const response = await fetch(process.env.NEXT_PUBLIC_API_URL + `/api/tasks/${id}`, {
		method: "DELETE",
		headers: {
			Authorization: "Bearer " + token,
		},
	}).then((res) => res.json())

	if (response.error) {
		console.log(response)
	}

	if (response.Message == "task deletion scheduled") {
		revalidatePath("/home/tasks")
	}
}
