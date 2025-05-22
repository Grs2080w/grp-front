"use client"

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"

import ButtonSub from "./buttonSub"
import SendOtp from "../services/sendOtp"

const formSchema = z
	.object({
		username: z.string().min(4, "username must have min 4 letters").max(10, "username must have max 10 letters"),
		password: z.string().min(8, "password must have min 8 letters").max(20, "password must have max 20 letters"),
		confirm_password: z.string().min(8, "confirm_password must have min 8 letters").max(20, "confirm_password must have max 20 letters"),
	})
	.refine((data) => data.password === data.confirm_password, {
		message: "confirm_password must match password",
		path: ["confirm_password"],
	})

export default function ProfileForm() {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			username: "",
			password: "",
			confirm_password: "",
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
				action={async (data) => {
					await SendOtp("password", data.get("password")!.toString(), data.get("username")!.toString())
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
								<Input autoFocus autoComplete="off" placeholder="username" {...field} />
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
								<Input autoComplete="off" placeholder="password" type="password" {...field} />
							</FormControl>
							<FormDescription>The Password of your account.</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="confirm_password"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Confirm Password</FormLabel>
							<FormControl>
								<Input autoComplete="off" placeholder="confirm password" type="password" {...field} />
							</FormControl>
							<FormDescription>The Confirm of your password. Both must be equals.</FormDescription>
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
