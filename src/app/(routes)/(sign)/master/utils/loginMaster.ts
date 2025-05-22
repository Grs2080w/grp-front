"use server"

import { User } from "@/types/User"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export default async function OnSubmitLoginMaster(values: { master: string | undefined }) {
	const cookie = await cookies()

	if (!cookie.has(process.env.NEXT_NAME_SERVER + "authtoken")) {
		redirect(`/login`)
	}

	const body = {
		master_password: values.master,
		token: cookie.get(process.env.NEXT_NAME_SERVER + "authtoken")?.value,
	}

	const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/master`, {
		method: "POST",
		body: JSON.stringify(body),
	}).then((res) => res.json())

	if (response.error) {
		const err: string = response.error
		return err.charAt(1).toUpperCase() + err.slice(2)
	}

	if (response.data) {
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
				maxAge: 60 * 60,
			})
			.set(process.env.NEXT_NAME_SERVER + "userprofile", JSON.stringify(data), {
				maxAge: 60 * 60,
				httpOnly: true,
				path: "/",
			})

		if (response.data) {
			redirect(`/home`)
		}
	}
}
