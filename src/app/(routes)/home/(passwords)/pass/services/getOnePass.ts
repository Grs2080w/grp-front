"use server"

import { revalidatePath } from "next/cache"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export default async function GetOnePass(id: string) {
	const cookiesS = await cookies()

	const token = cookiesS.get(process.env.NEXT_NAME_SERVER + "authtoken")?.value

	if (!token) {
		redirect(`/login`)
	}

	const response = await fetch(process.env.NEXT_PUBLIC_API_URL + `/api/passwords/${id}`, {
		cache: "force-cache",
		method: "GET",
		headers: {
			Authorization: "Bearer " + token,
		},
	}).then((res) => res.json())

	if (response.error) {
		console.log(response)
	}

	revalidatePath(`/home/pass`)

	return response
}
