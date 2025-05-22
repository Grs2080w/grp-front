"use client"

import { UseFormReturn } from "react-hook-form"
import { z, ZodError } from "zod"

const formSchema = z.object({
	file: z.instanceof(File, { message: "File is Required" }),
	filename: z.string().min(1, "Filename must have at least 1 letter"),
	size: z.number().min(1, "Size must have at least 1 size"),
	type: z.string().min(1, "Type must have at least 1 letter"),
})

interface Props {
	event: React.FormEvent
	file: File | undefined
	filename: string
	size: number
	type: string
	form: UseFormReturn<
		{
			file: File
			type: string
			filename: string
			size: number
		},
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		any,
		{
			file: File
			type: string
			filename: string
			size: number
		}
	>
}

export function handleCapture({ event, file, filename, size, type, form }: Props) {
	try {
		formSchema.parse({
			file,
			filename,
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
