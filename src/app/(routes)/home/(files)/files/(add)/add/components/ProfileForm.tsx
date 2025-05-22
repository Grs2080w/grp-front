"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"

import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Tag } from "lucide-react"
import { toast } from "sonner"

import { OnSubmitAction } from "../services/onSubmitAction"
import ButtonSub from "./ButtonSub"
import { handleCapture } from "../utils/handle-capture"
import RenderTagsInput from "./RenderTags"
import RenderFilesInput from "./RenderFiles"
import DialogFile from "./DialogFile"

interface Tag {
	name: string
	style: string
	id: number
}

export default function ProfileForm() {
	const [file, setFile] = useState<File | undefined>(undefined)
	const [filenameLabel, setfilenameLabel] = useState<string>("")
	const [size, setSize] = useState<number>(0)
	const [filename, setFilename] = useState<string>("")
	const [type, setType] = useState<string>("")
	const [tags, setTags] = useState<Tag[]>([])
	const [tagName, setTagName] = useState<string>("")

	const [dialog, setDialog] = useState<boolean>(false)
	const [filenameDialog, setFilenameDialog] = useState<string>("")
	const [editFilename, setEditFilename] = useState<boolean>(true)

	const form = useForm({
		defaultValues: {
			file: new File([], ""),
			filename: "",
			size: 0,
			type: "",
		},
	})

	async function FileExists(file: File | undefined, filename: string, size: number, type: string, tags: Tag[]) {
		const indexBar = filename.lastIndexOf(".")
		const ext = filename.substring(indexBar)

		const res = await fetch("/api/files/exists", {
			method: "POST",
			body: JSON.stringify({ filename, type: ext }),
		}).then((res) => res.json())

		if (res.exists) {
			setFilenameDialog(filename)
			setEditFilename(true)
			setDialog(true)
		} else {
			OnSubmitAction({ file, filename, size, type, tags }).then((result) => {
				// eslint-disable-next-line @typescript-eslint/no-unused-expressions
				result !== "" && toast(result) && form.reset()
			})
		}
	}

	return (
		<Form {...form}>
			<form
				className="space-y-8 text-left"
				action={() => {
					FileExists(file, filename, size, type, tags)
				}}
				onSubmitCapture={(event) => handleCapture({ event, file, filename, form, size, type })}
			>
				<RenderFilesInput setFile={setFile} setFilename={setFilename} filenameLabel={filenameLabel} form={form} setSize={setSize} setType={setType} setfilenameLabel={setfilenameLabel} />

				<FormField
					control={form.control}
					name="filename"
					render={({ field }) => (
						<FormItem>
							<FormLabel>*Filename</FormLabel>
							<FormControl>
								<Input
									autoComplete="false"
									placeholder="filename"
									value={filename}
									onChange={(e) => {
										setFilename(e.target.value.trim())
										form.clearErrors("filename")
									}}
									ref={field.ref}
								/>
							</FormControl>
							<FormDescription>The name of your file. You may change if you wanted but dont forget put the file entension.</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="type"
					render={({ field }) => (
						<FormItem>
							<FormLabel>*Type</FormLabel>
							<FormControl>
								<Input
									autoComplete="false"
									placeholder="type"
									value={type}
									onChange={(e) => {
										setType(e.target.value.trim())
										form.clearErrors("type")
									}}
									ref={field.ref}
								/>
							</FormControl>
							<FormDescription>The File Type. It is not recommended change this.</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="size"
					render={({ field }) => (
						<FormItem>
							<FormLabel>*Size</FormLabel>
							<FormControl>
								<Input
									autoComplete="false"
									placeholder="size"
									type="number"
									value={size}
									onChange={(e) => {
										setSize(Number(e.target.value))
										field.value = Number(e.target.value)
										form.clearErrors("size")
									}}
									ref={field.ref}
								/>
							</FormControl>
							<FormDescription>The File Size. It is not recommended change this too.</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>

				<RenderTagsInput tags={tags} setTags={setTags} tagName={tagName} setTagName={setTagName} />

				<div className="">
					<ButtonSub />
				</div>

				<DialogFile dialog={dialog} editFilename={editFilename} filenameDialog={filenameDialog} setDialog={setDialog} setEditFilename={setEditFilename} form={form} file={file} size={size} tags={tags} type={type} setFilenameDialog={setFilenameDialog} />
			</form>
		</Form>
	)
}
