"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export default async function changePhoto(photo: File) {
	const cookiesS = await cookies()

	const token = cookiesS.get(process.env.NEXT_NAME_SERVER + "authtoken")?.value

	if (!token) {
		redirect(`/login`)
	}

	const body = new FormData()
	body.append("photo", photo)

	const response = await fetch(process.env.NEXT_PUBLIC_API_URL_2 + `/api/users/photo`, {
		cache: "no-cache",
		method: "PATCH",
		headers: {
			Authorization: "Bearer " + token,
		},
		body,
	}).then((res) => res.json())

	if (response?.error) {
		console.log(response)
	}

	return response
}
