"use server"

import { User } from "@/types/User"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export async function getUserCredentials() {
	const cookiesStore = await cookies()

	if (!cookiesStore.has(process.env.NEXT_NAME_SERVER + "userprofile")) {
		redirect(`/login`)
	}
	
	const user : User = JSON.parse(cookiesStore.get(process.env.NEXT_NAME_SERVER + "userprofile")!.value)

	const username = user.username
	const email = user.email.slice(0, 12) + "..."
	const emailMore = user.email.slice(0, 20) + "..."
	const avatarUser = user.avatar_url ?? ""

	return { username, email, emailMore, avatarUser }
}
