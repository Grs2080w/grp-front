"use client"

import { UseFormReturn } from "react-hook-form"
import { z, ZodError } from "zod"

const baseSchema = z.object({
	identifier: z.string().min(3, "Identifier must have at least 3 letters"),
	master: z.string().min(8, "Master must have 8 letters").max(8, "Master must have 8 letters"),
	mode: z.enum(["auto", "manual"]),

	digits: z.boolean().optional(),
	length: z.number().optional(),
	lowercase_letters: z.boolean().optional(),
	special_characters: z.boolean().optional(),
	uppercase_letters: z.boolean().optional(),
	password: z.string().optional(),
})

export const formSchema = baseSchema.superRefine((data, ctx) => {
	if (data.mode !== "auto") {
		if (!data.password || data.password.length < 4) {
			ctx.addIssue({
				path: ["password"],
				code: z.ZodIssueCode.custom,
				message: "Password must have at least 1 letter in manual mode",
			})
		}
	}
})

interface Props {
	event: React.FormEvent
	identifier: string
	master: string
	mode: "auto" | "manual"
	params: {
		digits: boolean
		length: number
		lowercase_letters: boolean
		special_characters: boolean
		uppercase_letters: boolean
	}
	password: string
	form: UseFormReturn<
		{
			identifier: string
			master: string
			mode: string
			digits: boolean
			length: number
			lowercase_letters: boolean
			special_characters: boolean
			uppercase_letters: boolean
			password: string
			tags: never[]
		},
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		any,
		{
			identifier: string
			master: string
			mode: string
			digits: boolean
			length: number
			lowercase_letters: boolean
			special_characters: boolean
			uppercase_letters: boolean
			password: string
			tags: never[]
		}
	>
}

export function handleCapture({ event, identifier, master, mode, params, password, form }: Props) {
	try {
		formSchema.parse({
			identifier,
			master,
			mode,
			params,
			password,
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
