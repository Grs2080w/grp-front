"use server"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export default async function SignOut() {
	;(await cookies())
		.delete(process.env.NEXT_NAME_SERVER + "userprofile")
		.delete(process.env.NEXT_NAME_SERVER + "authtoken")
	redirect(`/login`)
}
