"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"

type File = {
	Pk?: string
	Sk?: string
	Extension: string
	Filename: string
	Tags: string[]
	Type: string
	Username?: string
	Versions: [
		{
			Date: string
			Id: string
			Is_latest: boolean
			Size: number
			Version: string
		}
	]
}

type FileByVersion = {
	Filename: string
	Extension: string
	Tags: string[]
	Date: string
	Id: string
	Is_latest: boolean
	Size: string
	Version: string
}

export default async function GetFiles() {
	const cookiesS = await cookies()

	const token = cookiesS.get(process.env.NEXT_NAME_SERVER + "authtoken")?.value

	if (!token) {
		redirect(`/login`)
	}

	return await fetch(process.env.NEXT_PUBLIC_API_URL + "/api/files", {
		cache: "force-cache",
		method: "GET",
		headers: {
			Authorization: "Bearer " + token,
		},
	})
		.then((res) => res.json())
		.then((res) => res as File[])
		.then((res) => {
			if (res) {
				return res?.map((file) => {
					delete file.Pk
					delete file.Sk
					delete file.Username
	
					return file
				})
			} else {
				return []
			}
		})
		.then((files) => {
			let listFiles: FileByVersion[] = []

			for (const i in files) {
				const listFilestoAppend = files[i].Versions.map((version) => {
					return {
						Filename: files[i].Filename,
						Extension: files[i].Extension,
						Tags: files[i].Tags,
						Date: version.Date,
						Id: version.Id,
						Is_latest: version.Is_latest,
						Size: version.Size.toString(),
						Version: version.Version,
					}
				})

				listFiles = listFiles.concat(...listFilestoAppend)
			}

			return listFiles.sort((a, b) => new Date(b.Date).getTime() - new Date(a.Date).getTime())
		})
}
