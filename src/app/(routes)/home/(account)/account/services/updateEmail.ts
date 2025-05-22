"use server"

import { revalidatePath } from "next/cache"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export type User = {
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

export default async function UpdateEmail(email: string) {
	const cookiesS = await cookies()

	const token = cookiesS.get(process.env.NEXT_NAME_SERVER + "authtoken")?.value

	if (!token) {
		redirect(`/login`)
	}

	const response = await fetch(process.env.NEXT_PUBLIC_API_URL + `/api/users/email`, {
		cache: "no-cache",
		method: "PATCH",
		headers: {
			Authorization: "Bearer " + token,
		},
		body: JSON.stringify({ email }),
	}).then((res) => res.json())

	if (response?.error) {
		console.log(response)
	}

    revalidatePath(`/home/account`)
}
