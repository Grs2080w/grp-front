"use server"

import { User } from "@/types/User"
import { revalidatePath } from "next/cache"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export default async function GetRefreshToken() {
	const cookiesS = await cookies()

	const token = cookiesS.get(process.env.NEXT_NAME_SERVER + "authtoken")?.value

	if (!token) {
		redirect(`/login`)
	}

	const response = await fetch(process.env.NEXT_PUBLIC_API_URL + `/api/auth/refresh`, {
		cache: "no-cache",
		method: "POST",
		headers: {
			Authorization: "Bearer " + token,
		},
	}).then((res) => res.json())

	const data : User = await fetch(process.env.NEXT_PUBLIC_API_URL + "/api/users", {
		method: "GET",
		headers: {
			Authorization: "Bearer " + response.data,
		},
	}).then((res) => res.json())

	;(await cookies())
		.set(process.env.NEXT_NAME_SERVER + "authtoken", response.data, {
			httpOnly: false,
			path: "/",
			maxAge: 60 * 60 * 24 * 30,
		})
		.set(process.env.NEXT_NAME_SERVER + "userprofile", JSON.stringify(data), {
			maxAge: 60 * 60 * 24 * 30,
			httpOnly: true,
			path: "/",
		})

	revalidatePath(`/home/account`)
	redirect(`/home/account`)
}
