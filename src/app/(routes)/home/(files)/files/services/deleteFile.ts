"use server"

import { revalidatePath } from "next/cache"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export default async function DeleteFile(id: string, ext: string, filename: string) {
	const cookiesS = await cookies()

	const token = cookiesS.get(process.env.NEXT_NAME_SERVER + "authtoken")?.value

	if (!token) {
		redirect(`/login`)
	}

	const body = {
		filename,
		id,
		type: ext,
	}

	return await fetch(process.env.NEXT_PUBLIC_API_URL + `/api/files`, {
		method: "DELETE",
		body: JSON.stringify(body),
		headers: {
			Authorization: "Bearer " + token,
		},
	})
		.then((res) => res.json())
		.then(() => {
			revalidatePath("/home/files")
			redirect(`/home/files`)
		})
}
