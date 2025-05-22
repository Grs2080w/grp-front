"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"

type User = {
	avatar_url: string
	email: string
	extra_verification: string
	failed_logins: string
	language: string
	master_password_hash: string
	secret_deterministic: string
	storage_used: string
	theme_preferences: string
	total_files: string
	username: string
}

export default async function OnSubmitLoginSecret(values: { secret: string | undefined }) {
	const cookie = await cookies()

	const token = cookie.get(process.env.NEXT_NAME_SERVER + "authtoken")!.value

	const body = {
		secret_code: values.secret,
		token,
	}

	const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/secret`, {
		method: "POST",
		body: JSON.stringify(body),
	}).then((res) => res.json())

	if (response.error) {
		const err: string = response.error
		return err.charAt(0).toUpperCase() + err.slice(1)
	}

	if (response.data) {
		const data: User = await fetch(process.env.NEXT_PUBLIC_API_URL + "/api/users", {
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
