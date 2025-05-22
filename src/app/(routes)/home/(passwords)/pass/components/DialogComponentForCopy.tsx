"use client"

import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useState } from "react"
import { toast } from "sonner"
import ButtonSub from "./ButtonSub"

interface Props {
	dialogOpen2: boolean
	setDialogOpen2: React.Dispatch<React.SetStateAction<boolean>>
	hash: string
}

async function GetPassText(master: string, hash: string) {
	const res = await fetch(`/api/pass`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			hash: hash,
			master: master,
		}),
	}).then((res) => res.json())

	return res
}

export default function DialogComponentForCopy({ dialogOpen2, setDialogOpen2, hash }: Props) {
	const [masterPassword, setMasterPassword] = useState("")

	async function OnSubmit() {
		const { pass, error } = await GetPassText(masterPassword, hash).then((res) => res)
		if (navigator.clipboard && pass) {
			await navigator.clipboard
				.writeText(pass)
				.then(() => {
					toast.success("Copied to clipboard")
				})
				.catch((err) => {
					console.log(err)
				})
		} else {
			if (error) {
				toast.error(error)
			}
		}
		setDialogOpen2(false)
		setMasterPassword("")
	}

	return (
		<Dialog open={dialogOpen2} onOpenChange={setDialogOpen2}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Verify</DialogTitle>
				</DialogHeader>
				<DialogDescription>Put the password master that you used when create this pass.</DialogDescription>
				<form action={async () => await OnSubmit()}>
					<Input value={masterPassword} onChange={(e) => setMasterPassword(e.target.value)} type="password" />
					<ButtonSub />
				</form>
			</DialogContent>
		</Dialog>
	)
}
