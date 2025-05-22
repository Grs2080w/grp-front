import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
	const { html, filename } = await req.json()
	if (!html) return NextResponse.json({ error: "Missing HTML." })
	if (!filename) return NextResponse.json({ error: "Missing Filename." })

	try {
		const cookiesS = await cookies()

		const token = cookiesS.get(process.env.NEXT_NAME_SERVER + "authtoken")?.value

		if (!token) {
			redirect(`/login`)
		}

		const url = process.env.NEXT_PUBLIC_API_URL_2 + "/api/editor/convert"

		const res = await fetch(url, {
			method: "POST",
			headers: {
				Authorization: "Bearer " + token,
			},
			body: JSON.stringify({ html, filename }),
		})

		if (!res.status || res.status != 200) {
			const text = await res.text()
			return NextResponse.json({ error: text }, { status: res.status })
		}

		return new NextResponse(res.body, {
			status: 200,
			headers: {
				"Content-Type": "application/pdf",
				"Content-Disposition": `attachment; filename="${filename}.pdf"`,
			},
		})
	} catch (err) {
		console.error(err)
	}
}
