"use server"

import { revalidatePath } from "next/cache"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

function sizeKB(phrase: string) {
	const encoder = new TextEncoder()
	const bytes = encoder.encode(phrase)
	const numBytes = bytes.length
	const kb = numBytes / 1024
	return kb
}

interface Pass {
	identifier: string
	master: string
	mode: "auto" | "manual"
	params: {
		digits: boolean
		length: number
		lowercase_letters: boolean
		special_characters: boolean
		uppercase_letters: boolean
	}
	password: string
	size?: number
	tags: string[]
}

export default async function AddPass({ identifier, master, mode, params, password, tags }: Pass) {
	const cookiesS = await cookies()

	const token = cookiesS.get(process.env.NEXT_NAME_SERVER + "authtoken")?.value

	if (!token) {
		redirect(`/login`)
	}

	const body = {
		identifier,
		master,
		mode,
		params: {
			digits: params.digits,
			length: params.length,
			lowercase_letters: params.lowercase_letters,
			special_characters: params.special_characters,
			uppercase_letters: params.uppercase_letters,
		},
		password,
		size: sizeKB(password) + 1,
		tags: tags,
	}

	const response = await fetch(process.env.NEXT_PUBLIC_API_URL + `/api/passwords`, {
		method: "POST",
		headers: {
			Authorization: "Bearer " + token,
		},
		body: JSON.stringify(body),
	}).then((res) => res.json())

	if (response.error) {
		console.log(response)
	}

	revalidatePath("/home/pass")
	redirect(`/home/pass`)
}
