"use client"

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"

import ButtonSub from "./buttonSub"
import { OnSubmitAction } from "../utils/OnSubmitAction"

const formSchema = z.object({
	username: z.string().min(4, "username must have min 4 letters").max(10, "username must have max 10 letters"),
	password: z.string().min(8, "password must have min 8 letters").max(20, "password must have max 20 letters"),
})

export default function ProfileForm() {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			username: "",
			password: "",
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
					name="username"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Username</FormLabel>
							<FormControl>
								<Input autoComplete="off" autoFocus placeholder="Username" {...field} />
							</FormControl>
							<FormDescription>The Username of your account.</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="password"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Password</FormLabel>
							<FormControl>
								<Input autoComplete="off" type="password" placeholder="Password" {...field} />
							</FormControl>
							<FormDescription>The Password of your account.</FormDescription>
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
