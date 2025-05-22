"use server"

import { revalidatePath } from "next/cache"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

function sizeKB(phrase: string) {
	const encoder = new TextEncoder()
	const bytes = encoder.encode(phrase)
	const numBytes = bytes.length
	const kb = numBytes / 1024
	return kb
}

export default async function AddTask(title: string) {
	const cookiesS = await cookies()

	const token = cookiesS.get(process.env.NEXT_NAME_SERVER + "authtoken")?.value

	if (!token) {
		redirect(`/login`)
	}

	const body = {
		description: "",
		size: sizeKB(title) + 0.0615,
		tags: [],
		title: title,
	}

	const response = await fetch(process.env.NEXT_PUBLIC_API_URL + `/api/tasks`, {
		method: "POST",
		headers: {
			Authorization: "Bearer " + token,
		},
		body: JSON.stringify(body),
	}).then((res) => res.json())

	if (response.error) {
		console.log(response)
	}
	
	revalidatePath("/home/tasks")
	return response.id

}
