import { NextResponse } from "next/server"
import { cookies } from "next/headers"

async function decryptAESGCM(encryptedB64: string, keystr: string) {
	const keyBytes = new TextEncoder().encode(keystr)

	const encryptedArray = Uint8Array.from(atob(encryptedB64), (c) => c.charCodeAt(0))

	const nonce = encryptedArray.slice(0, 12)
	const ciphertext = encryptedArray.slice(12)

	const cryptoKey = await crypto.subtle.importKey("raw", keyBytes, { name: "AES-GCM" }, false, ["decrypt"])

	const decryptedBuffer = await crypto.subtle.decrypt(
		{
			name: "AES-GCM",
			iv: nonce,
			additionalData: new Uint8Array(),
			tagLength: 128,
		},
		cryptoKey,
		ciphertext.buffer
	)

	return new TextDecoder().decode(decryptedBuffer)
}

export async function POST(request: Request) {
	const { hash, master }: { hash: string; master: string } = await request.json()

	if (!(await cookies()).has(process.env.NEXT_NAME_SERVER + "authtoken")) {
		NextResponse.redirect("/login", 303)
	}

	const masterReverse = master + master.split("").reverse().join("")

	try {
		await decryptAESGCM(hash, masterReverse)
	} catch (err) {
		console.log(err)

		return NextResponse.json({ error: "Invalid master password" }, { status: 400 })
	}

	const password = await decryptAESGCM(hash, masterReverse)

	const response = NextResponse.json({
		pass: password,
	})
	return response
}
