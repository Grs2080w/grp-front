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
import RenderEbookInput from "./RenderEbook"

interface Tag {
	name: string
	style: string
	id: number
}

export default function ProfileForm() {
	const [ebook, setEbook] = useState<File | undefined>()
	const [nameLabel, setEbooknameLabel] = useState<string>("")
	const [size, setSize] = useState<number>(0)
	const [ebookname, setEbookname] = useState<string>("")
	const [type, setType] = useState<string>("")
	const [tags, setTags] = useState<Tag[]>([])
	const [tagName, setTagName] = useState<string>("")

	const form = useForm({
		defaultValues: {
			ebook: new File([], ""),
			ebookname: "",
			size: 0,
			type: "",
		},
	})

	return (
		<Form {...form}>
			<form
				className="space-y-8 text-left"
				action={() => {
					if (!ebookname.includes(".pdf") || !ebookname.includes(".epub")) {
						toast.error("Ebook must have .pdf or .epub extension")
						setEbook(undefined)
						setEbooknameLabel("")
						setEbookname("")
						setSize(0)
						setType("")
						setTags([])
					} else {
						OnSubmitAction({ ebook, ebookname, size, type, tags }).then((result) => {
							// eslint-disable-next-line @typescript-eslint/no-unused-expressions
							result !== "" && toast(result) && form.reset()
						})
					}
				}}
				onSubmitCapture={(event) => handleCapture({ event, ebook, ebookname, form, size, type })}
			>
				<RenderEbookInput setEbook={setEbook} setEbookname={setEbookname} nameLabel={nameLabel} form={form} setSize={setSize} setType={setType} setEbooknameLabel={setEbooknameLabel} />

				<FormField
					control={form.control}
					name="ebookname"
					render={({ field }) => (
						<FormItem>
							<FormLabel>*Ebook name</FormLabel>
							<FormControl>
								<Input
									autoComplete="false"
									placeholder="Ebook name"
									value={ebookname}
									onChange={(e) => {
										setEbookname(e.target.value.trim())
										form.clearErrors("ebookname")
									}}
									ref={field.ref}
								/>
							</FormControl>
							<FormDescription>The name of your Ebook. You may change if you wanted but dont forget put the ebook entension.</FormDescription>
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
									placeholder="Type"
									value={type}
									onChange={(e) => {
										setType(e.target.value.trim())
										form.clearErrors("type")
									}}
									ref={field.ref}
								/>
							</FormControl>
							<FormDescription>The Ebook Type. It is not recommended change this.</FormDescription>
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
							<FormDescription>The Ebook Size. It is not recommended change this too.</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>

				<RenderTagsInput tags={tags} setTags={setTags} tagName={tagName} setTagName={setTagName} />

				<div className="">
					<ButtonSub />
				</div>
			</form>
		</Form>
	)
}
