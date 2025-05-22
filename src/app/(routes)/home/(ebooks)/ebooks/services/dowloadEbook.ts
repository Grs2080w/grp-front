"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export default async function DownloadEbook(id: string, ext: string) {
    const cookiesS = await cookies()

    const token = cookiesS.get(process.env.NEXT_NAME_SERVER + "authtoken")?.value

    if (!token) {
        redirect(`/login`)
    }

    return await fetch(process.env.NEXT_PUBLIC_API_URL + `/api/download?id=${id}&ext=${ext}`, {
        method: "GET",
        headers: {
            Authorization: "Bearer " + token,
        },
    })
        .then((res) => res.json())
        .then((res) => {
            redirect(res.url)
        })
}
