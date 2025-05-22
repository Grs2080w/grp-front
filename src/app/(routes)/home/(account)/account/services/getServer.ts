"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export type Server = {
	status: string
	HUA: number
}

export default async function GetServer() {
	const cookiesS = await cookies()

	const token = cookiesS.get(process.env.NEXT_NAME_SERVER + "authtoken")?.value

	if (!token) {
		redirect(`/login`)
	}

	const response = await fetch(process.env.NEXT_PUBLIC_API_URL + `/api/health`, {
		cache: "no-cache",
		method: "GET",
	}).then((res) => {
		if (res.status != 200) {
			return { status: "offline", HUA: 0 }
		} else if (res as Response) {
			return res.json()
		}
	})

	return response as Server
}
