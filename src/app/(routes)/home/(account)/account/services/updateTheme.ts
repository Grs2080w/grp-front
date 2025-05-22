"use server"

import { revalidatePath } from "next/cache"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export default async function updateTheme(theme: string) {
	const cookiesS = await cookies()

	const token = cookiesS.get(process.env.NEXT_NAME_SERVER + "authtoken")?.value

	if (!token) {
		redirect(`/login`)
	}

	const response = await fetch(process.env.NEXT_PUBLIC_API_URL + `/api/users/theme`, {
		cache: "no-cache",
		method: "PATCH",
		headers: {
			Authorization: "Bearer " + token,
		},
		body: JSON.stringify({ theme }),
	}).then((res) => res.json())
	
	if (response?.error) {
		console.log(response)
	}

    revalidatePath(`/home/account`)
}
