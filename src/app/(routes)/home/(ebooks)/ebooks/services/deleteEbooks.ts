"use server"

import { revalidatePath } from "next/cache"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export default async function DeleteEbook(id: string) {
	const cookiesS = await cookies()

	const token = cookiesS.get(process.env.NEXT_NAME_SERVER + "authtoken")?.value

	if (!token) {
		redirect(`/login`)
	}

	return await fetch(process.env.NEXT_PUBLIC_API_URL + `/api/ebooks/${id}`, {
		method: "DELETE",
		headers: {
			Authorization: "Bearer " + token,
		},
	})
		.then((res) => res.json())
		.then((res) => {
			if (res.message === "ebook deletion scheduled") {
				revalidatePath("/home/ebooks")
				redirect(`/home/ebooks`)
			} else {
                console.log(res);
            }
		})
}
