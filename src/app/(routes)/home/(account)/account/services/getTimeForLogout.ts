"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { jwtDecode } from "jwt-decode"

export default async function GetTimeForLogout() {
	const cookiesS = await cookies()

	const token = cookiesS.get(process.env.NEXT_NAME_SERVER + "authtoken")?.value

	if (!token) {
		redirect(`/login`)
	}

	interface JWTPayload {
		exp: number
	}
	const { exp } = jwtDecode<JWTPayload>(token)
	const expiresAtMs = exp * 1000
	const nowMs = Date.now()
	const timeLeftSec = Math.floor((expiresAtMs - nowMs) / 1000)

	return { timeLeftSec , expiresAtMs }
}
