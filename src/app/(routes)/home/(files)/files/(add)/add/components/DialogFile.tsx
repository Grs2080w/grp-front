"use client"

import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Pencil } from "lucide-react"
import { Input } from "@/components/ui/input"
import { OnSubmitAction } from "../services/onSubmitAction"
import { toast } from "sonner"
import { UseFormReturn } from "react-hook-form"
import { Dispatch, SetStateAction } from "react"

interface Tag {
	name: string
	style: string
	id: number
}

interface GetValueProps {
	file: File | undefined
	filenameDialog: string
	size: number
	type: string
	tags: Tag[]
	form: UseFormReturn<
		{
			file: File
			filename: string
			size: number
			type: string
		},
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		any,
		{
			file: File
			filename: string
			size: number
			type: string
		}
	>
}

function GetValueDialog({ file, filenameDialog, size, type, tags, form }: GetValueProps) {
	const filename = filenameDialog

	OnSubmitAction({ file, filename, size, type, tags }).then((result) => {
		// eslint-disable-next-line @typescript-eslint/no-unused-expressions
		result !== "" && toast(result) && form.reset()
	})
}

const styles = {
	dialogContent: "sm:max-w-md",
	inputRow: "flex items-center space-x-2",
	inputWrapper: "grid flex-1 gap-2",
	editButton: "px-3",
	dialogFooter: "sm:justify-start",
}

interface Props {
	dialog: boolean
	setDialog: Dispatch<SetStateAction<boolean>>
	setFilenameDialog: Dispatch<SetStateAction<string>>
	filenameDialog: string
	editFilename: boolean
	setEditFilename: Dispatch<SetStateAction<boolean>>
	form: UseFormReturn<
		{
			file: File
			filename: string
			size: number
			type: string
		},
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		any,
		{
			file: File
			filename: string
			size: number
			type: string
		}
	>
	file: File | undefined
	tags: Tag[]
	size: number
	type: string
}

export default function DialogFile({ dialog, setDialog, filenameDialog, editFilename, setFilenameDialog, setEditFilename, form, file, size, tags, type }: Props) {
	return (
		<Dialog open={dialog} onOpenChange={setDialog}>
			<DialogContent className={styles.dialogContent}>
				<DialogHeader>
					<DialogTitle>File Existent</DialogTitle>
					<DialogDescription>This file already exists in your server. Change the name and continue to save as a new file, or just continue to save this file like a new version.</DialogDescription>
				</DialogHeader>
				<div className={styles.inputRow}>
					<div className={styles.inputWrapper}>
						<Input value={filenameDialog} onChange={(e) => setFilenameDialog(e.target.value)} disabled={editFilename} id="link" />
					</div>
					<Button onClick={() => setEditFilename(!editFilename)} type="button" size="sm" className={styles.editButton}>
						<Pencil />
					</Button>
				</div>
				<DialogFooter className={styles.dialogFooter}>
					<DialogClose asChild>
						<Button onClick={() => GetValueDialog({ file, filenameDialog, size, type, tags, form })} type="button" variant="secondary">
							Continue
						</Button>
					</DialogClose>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}
