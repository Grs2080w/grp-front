"use server"

import { cookies } from "next/headers"

export type Message = {
	date: string
	hour: string
	id: string
	message: string
}

export default async function GetMessages() {
	const cookie = await cookies()
	const token = cookie.get(process.env.NEXT_NAME_SERVER + "authtoken")!.value

	const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/chat`, {
		method: "GET",
		headers: {
			Authorization: "Bearer " + token,
		},
	}).then((res) => res.json())

	return response as Message[] ?? []
}
