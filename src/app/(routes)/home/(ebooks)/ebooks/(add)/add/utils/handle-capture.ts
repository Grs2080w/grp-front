"use client"

import { UseFormReturn } from "react-hook-form"
import { z, ZodError } from "zod"

const formSchema = z.object({
	ebook: z.instanceof(File, { message: "Ebook is Required" }),
	ebookname: z.string().min(1, "Name must have at least 1 letter"),
	size: z.number().min(1, "Size must have at least 1 size"),
	type: z.string().min(1, "Type must have at least 1 letter"),
})

interface Props {
	event: React.FormEvent
	ebook: File | undefined
	ebookname: string
	size: number
	type: string
	form: UseFormReturn<
		{
			ebook: File
			type: string
			ebookname: string
			size: number
		},
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		any,
		{
			ebook: File
			type: string
			ebookname: string
			size: number
		}
	>
}

export function handleCapture({ event, ebook, ebookname, size, type, form }: Props) {
	try {
		formSchema.parse({
			ebook,
			ebookname,
			size,
			type,
		})
	} catch (e) {
		event.preventDefault()
		if (e instanceof ZodError && (e as ZodError)) {
			e.errors.forEach((err) => {
				const name = err.path[0]
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				form.setError(name as any, {
					type: "manual",
					message: err.message,
				})
			})
		}
	}
}
