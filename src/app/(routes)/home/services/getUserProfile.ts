"use server"

import { User } from "@/types/User"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export async function getUserProfile() {
	const cookiesStore = await cookies()

	if (!cookiesStore.has(process.env.NEXT_NAME_SERVER + "userprofile")) {
		redirect(`/login`)
	}

	const user: User = JSON.parse(cookiesStore.get(process.env.NEXT_NAME_SERVER + "userprofile")!.value)
	return user
}
