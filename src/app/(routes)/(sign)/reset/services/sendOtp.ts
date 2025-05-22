"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"

type Verification = "master" | "secret" | "type" | "password"

export default async function SendOtp(verification: Verification, code: string, username: string) {

	await fetch(process.env.NEXT_PUBLIC_API_URL + `/api/auth/otp/${verification}`, {
		method: "POST",
		body: JSON.stringify({ username }),
	}).then((res) => res.json())

	;(await cookies()).set(process.env.NEXT_NAME_SERVER + "value_verification", code, {
		path: "/",
		maxAge: 60 * 5,
		httpOnly: true,
	}).set(process.env.NEXT_NAME_SERVER + "value_verification_username", username, {
		path: "/",
		maxAge: 60 * 5,
		httpOnly: true,
	})

	redirect(`/otp/${verification}`)
}
