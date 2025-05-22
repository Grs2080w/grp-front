"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"

import { toast } from "sonner"
import ButtonSub from "./buttonSub"
import { OnSubmitAction } from "../utils/OnSubmitAction"

const formSchema = z.object({
	master: z.string().min(3, "master password must have min 3 letters"),
})

export default function ProfileForm() {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			master: "",
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
					name="master"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Master Password</FormLabel>
							<FormControl>
								<Input autoComplete="false" autoFocus placeholder="Master Password" type="password" {...field} />
							</FormControl>
							<FormDescription>The master password of your user. It is required to sing in your acoount.</FormDescription>
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
