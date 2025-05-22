"use server"

import { revalidatePath } from "next/cache"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

type Verification = "master" | "secret" | "type" | "password"

export default async function FetchOtp(verification: Verification, code: string) {
	const cookiesS = await cookies()

	const token = cookiesS.get(process.env.NEXT_NAME_SERVER + "authtoken")?.value

	if (!token && verification != "password") {
		redirect(`/login`)
	}
	
	const value = cookiesS.get(process.env.NEXT_NAME_SERVER + "value_verification")?.value
	const username = cookiesS.get(process.env.NEXT_NAME_SERVER + "value_verification_username")?.value
	
	if (!value) {
		redirect(`/home/account`)
	}

	let body = null

	switch (verification) {
		case "master":
			body = { master_password: value, code }
			break
		case "secret":
			body = { secret: value, code }
			break
		case "type":
			body = { type: value, code }
			break
		case "password":
			body = { password: value, code , username}
			break
	}

	const response = await fetch(process.env.NEXT_PUBLIC_API_URL + `/api/users/${verification}`, {
		cache: "no-cache",
		method: "PATCH",
		headers: {
			Authorization: "Bearer " + token,
		},
		body: JSON.stringify(body),
	}).then((res) => res.json())

	if (response.error) {

		const error : string = response.error
		return [error.charAt(0).toUpperCase() + response.error.slice(1), true]
	}
	
	revalidatePath(`/home/account`)
	redirect(`/home/account`)

}
