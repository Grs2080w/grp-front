"use client"

import { Copy, Trash2 } from "lucide-react"
import { Pass } from "../services/getPass"
import { Button } from "@/components/ui/button"
import Image from "next/image"

import { useState } from "react"
import DialogComponent from "./DialogComponent"
import DialogComponentForCopy from "./DialogComponentForCopy"
import DialogComponentDelete from "./DialogComponentDelete"

const styles = {
	wrapper: "flex flex-wrap gap-3 pb-12",
	card: "flex flex-col my-2 justify-between border-3 rounded-md p-3 grow max-w-[600px] w-[350px] h-[150px]",
	cardHeader: "font-bold text-4xl flex gap-3 items-center",
	buttonsRow: "flex gap-2",
	copyButton: "hover:cursor-pointer",
	deleteButton: "hover:cursor-pointer bg-red-500 hover:bg-red-400 active:bg-red-600",
	detailsButton: "hover:cursor-pointer",
	noPasswords: "font-bold text-gray-700 text-2xl",
	image: "rounded-lg",
}

interface Props {
	data: Pass[]
}

export default function ListPass({ data }: Props) {
	const [dialogOpen, setDialogOpen] = useState(false)
	const [dialogOpen2, setDialogOpen2] = useState(false)
	const [dialogOpen3, setDialogOpen3] = useState(false)
	const [passToCopy, setPassToCopy] = useState<string>("")
	const [passToDelete, setPassToDelete] = useState<string>("")
	const [passToSee, setPassToSee] = useState<Pass>({
		Identifier: "",
		Hash: "",
		Size: 1,
		Id: "",
		Tags: [],
	})

	return (
		<div className={styles.wrapper}>
			{data?.length > 0 ? (
				data?.map((pass, index) => (
					<div key={index} className={styles.card}>
						<div className={styles.cardHeader}>
							<Image className={styles.image} src={`https://img.logo.dev/${pass.Identifier.toLowerCase()}.com?token=pk_NY8v5mItRK6DSqGcZz3Qkw`} alt={pass.Identifier} width={40} height={40} />
							{pass.Identifier}
						</div>
						<div className="flex justify-between items-center">
							<div className={styles.buttonsRow}>
								<Button
									onClick={() => {
										setPassToCopy(pass.Hash)
										setDialogOpen2(true)
									}}
									className={styles.copyButton}
								>
									<Copy />
								</Button>
								<Button
									onClick={() => {
										setPassToDelete(pass.Id)
										setDialogOpen3(true)
									}}
									className={styles.deleteButton}
								>
									<Trash2 color="white" />
								</Button>
							</div>
							<div>
								<Button
									onClick={() => {
										setDialogOpen(true)
										setPassToSee(pass)
									}}
									className={styles.detailsButton}
									variant={"outline"}
								>
									Details
								</Button>
							</div>
						</div>
						<DialogComponent dialogOpen={dialogOpen} setDialogOpen={setDialogOpen} passToSee={passToSee} />
						<DialogComponentForCopy dialogOpen2={dialogOpen2} setDialogOpen2={setDialogOpen2} hash={passToCopy} />
						<DialogComponentDelete dialogOpen={dialogOpen3} setDialogOpen={setDialogOpen3} passToSee={passToDelete} />
					</div>
				))
			) : (
				<div className={styles.noPasswords}>No Passwords to see</div>
			)}
		</div>
	)
}
