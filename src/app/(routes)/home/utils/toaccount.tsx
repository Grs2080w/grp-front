"use server"

import { redirect } from "next/navigation"

export default async function ToAccount() {
	"use server"
	redirect(`/home/account`)
}
