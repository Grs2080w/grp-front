"use server"

import { redirect } from "next/navigation"
import { cookies } from "next/headers"

export default async function OnSubmitLogin(values: { username: string | undefined, password: string | undefined }) {
	const url_api = process.env.NEXT_PUBLIC_API_URL

	const response = await fetch(`${url_api}/api/auth`, {
		method: "POST",
		body: JSON.stringify(values),
	}).then((res) => res.json())

	if (response.error) {
		const err: string = response.error
		return err.charAt(0).toUpperCase() + err.slice(1)
	}

	if (response.data) {
		;(await cookies()).set(process.env.NEXT_NAME_SERVER + "authtoken", response.data, {
			httpOnly: true,
			path: "/",
			maxAge: 60,
		})

		// eslint-disable-next-line @typescript-eslint/no-unused-expressions
		response.type === "master_password" && redirect(`/master`)
		// eslint-disable-next-line @typescript-eslint/no-unused-expressions
		response.type === "secret_deterministic" && redirect(`/secret`)
	}
}
