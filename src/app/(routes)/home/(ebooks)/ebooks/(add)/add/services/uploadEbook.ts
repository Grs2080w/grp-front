"use server"

import { revalidatePath } from "next/cache"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export default async function OnSubmitUploadEbook(values: FormData) {
	const cookie = await cookies()
	const token = cookie.get(process.env.NEXT_NAME_SERVER + "authtoken")!.value

	const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL_2}/api/ebooks`, {
		method: "POST",
		body: values,
		credentials: "include",
		headers: {
			Authorization: "Bearer " + token,
		},
	})
	.then((res) => res.json())

	revalidatePath("/home/ebooks")
	

	if (response.error) {
		const err: string = response.error
		return err.charAt(0).toUpperCase() + err.slice(1)
	}

	if (response.message === "Ebook adition scheduled") {
		redirect(`/home/ebooks`)
	}
}
