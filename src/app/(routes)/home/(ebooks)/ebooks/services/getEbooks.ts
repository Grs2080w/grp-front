"use server"

import { cookies } from "next/headers"

export type Ebook = {
	Date: string
	Extension: string
	Id: string
	Name: string
	Size: number
	Tags: string[]
	UrlImage: string
}

export default async function GetEbooks() {
	const cookie = await cookies()
	const token = cookie.get(process.env.NEXT_NAME_SERVER + "authtoken")!.value

	const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/ebooks`, {
		method: "GET",
		headers: {
			Authorization: "Bearer " + token,
		},
	})
		.then((res) => res.json())
		.then((res) => {
			if (res) {
				return res.map((ebook: Ebook) => {
					if (ebook.Extension == ".pdf") {
						ebook.UrlImage = `${process.env.NEXT_URL_BUCKET}${ebook.Id}_thumb.jpg?`
						return ebook
					} else {
						ebook.UrlImage = ""
						return ebook
					}
				})
			} else {
				return []
			}
		})

	return response as Ebook[]
}
