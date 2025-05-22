"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useForm } from "react-hook-form"

import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"

import ButtonSub from "./buttonSub"
import { OnSubmitAction } from "../utils/OnSubmitAction"

const formSchema = z.object({
	secret: z.string().min(3, "secret password must have min 3 letters"),
})

export default function ProfileForm() {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			secret: "",
		},
	})

	const handleCapture = async (e: React.FormEvent) => {
		const valid = await form.trigger()
		if (!valid) e.preventDefault() 
	}

	return (
		<Form {...form}>
			<form
				className="space-y-8 text-left"
				action={(data) => {
					OnSubmitAction({ data }).then((result) => {
						// eslint-disable-next-line @typescript-eslint/no-unused-expressions
						result !== "" && toast(result) && form.reset()
					})
				}}
				onSubmitCapture={handleCapture}
			>
				<FormField
					control={form.control}
					name="secret"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Secret Code</FormLabel>
							<FormControl>
								<Input autoFocus autoComplete="false" placeholder="Secret Code" type="password" {...field} />
							</FormControl>
							<FormDescription>The secret code of your user. It is required to sing in your account.</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<div className="text-center">
					<ButtonSub />
				</div>
			</form>
		</Form>
	)
}
