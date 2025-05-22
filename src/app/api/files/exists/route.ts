import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export async function POST(request: Request) {
	const { filename, type } = await request.json()

	if (!(await cookies()).has(process.env.NEXT_NAME_SERVER + "authtoken")) {
		redirect("/login")
	}

	const token = (await cookies()).get(process.env.NEXT_NAME_SERVER + "authtoken")!.value

	const result = await fetch(process.env.NEXT_PUBLIC_API_URL + "/api/files/exists", {
		method: "POST",
		headers: {
			Authorization: "Bearer " + token,
		},
		body: JSON.stringify({ filename, type }),
	}).then((res) => res.json())

	const response = NextResponse.json(result)
	return response
}
