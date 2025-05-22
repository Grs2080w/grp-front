"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"

interface Metric {
	key: number
}

export type Metrics = {
	files_per_extension: Metric[]
	records_per_domain: Metric[]
	storage_per_domain: Metric[]
	storage_per_type: Metric[]
}

export default async function GetMetrics() {
	const cookiesS = await cookies()

	const token = cookiesS.get(process.env.NEXT_NAME_SERVER + "authtoken")?.value

	if (!token) {
		redirect(`/login`)
	}

	const response = await fetch(process.env.NEXT_PUBLIC_API_URL + `/api/metrics`, {
		cache: "no-cache",
		method: "GET",
		headers: {
			Authorization: "Bearer " + token,
		},
	}).then((res) => res.json())

	return response as Metrics
}
