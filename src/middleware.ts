import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
	if (request.url.includes("/create")) {
		return NextResponse.redirect(new URL("/create/redirect", request.url))
	}

	if (!request.cookies.has(process.env.NEXT_NAME_SERVER + "authtoken") && !request.url.includes("/login") && !request.url.includes("/create")) {
		return NextResponse.redirect(new URL("/login", request.url))
	}

	if (!request.cookies.has(process.env.NEXT_NAME_SERVER + "userprofile") && request.url.includes("/home")) {
		return NextResponse.redirect(new URL("/login", request.url))
	}

	if (request.cookies.has(process.env.NEXT_NAME_SERVER + "userprofile") && !request.url.includes("/home")) {
		return NextResponse.redirect(new URL("/home", request.url))
	}

	return NextResponse.next()
}

export const config = {
	matcher: ["/home/((?!general).*)", "/secret", "/master", "/login", "/create"],
}
