"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export type Pass = {
	Id: string
	Hash: string
	Identifier: string
	Tags: string[]
	Size: number
}

export default async function GetPass() {
	const cookiesS = await cookies()

	const token = cookiesS.get(process.env.NEXT_NAME_SERVER + "authtoken")?.value

	if (!token) {
		redirect(`/login`)
	}

	const response = await fetch(process.env.NEXT_PUBLIC_API_URL + `/api/passwords`, {
		cache: "force-cache",
		method: "GET",
		headers: {
			Authorization: "Bearer " + token,
		},
	}).then((res) => res.json())

	return response as Pass[]
}
