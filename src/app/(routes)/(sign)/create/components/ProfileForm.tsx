"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"

import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

import { toast } from "sonner"
import { redirect } from "next/navigation"
import { OnSubmitAction } from "../utils/OnSubmitAction"
import ButtonSub from "./buttonSub"

const baseSchema = z.object({
	username: z.string().min(4).max(10),
	password: z.string().min(8).max(20),
	email: z.string().email(),
	language: z.enum(["en", "pt-br"]),
	theme_preferences: z.enum(["dark", "light"]),
})

const masterPwdSchema = z.object({ extra_verification: z.literal("master_password") }).merge(
	z.object({
		code: z.string().min(8, "master must be at least 8 letters"),
	})
)

const secretDetSchema = z.object({ extra_verification: z.literal("secret_deterministic") }).merge(
	z.object({
		code: z.string().min(3, "code must be at least 3 letters"),
	})
)

const formSchema = z.discriminatedUnion("extra_verification", [masterPwdSchema.merge(baseSchema), secretDetSchema.merge(baseSchema)])

export default function ProfileForm() {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			username: "",
			password: "",
			email: "",
			language: "pt-br",
			theme_preferences: "dark",
			extra_verification: "master_password",
			code: "",
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
						result != "" && toast(result)
						redirect("/login")
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
								<Input autoFocus placeholder="username" {...field} />
							</FormControl>
							<FormDescription>This is your username on server.</FormDescription>
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
								<Input autoComplete="false" type="password" placeholder="password" {...field} />
							</FormControl>
							<FormDescription>This is your password on server. You will use to acess the server.</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="email"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Email</FormLabel>
							<FormControl>
								<Input placeholder="email" {...field} />
							</FormControl>
							<FormDescription>This is your Email on server. It is will be used to verify your identity.</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="language"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Language</FormLabel>
							<FormControl>
								<RadioGroup onValueChange={field.onChange} defaultValue={field.value} name="language">
									<div className="flex items-center space-x-2">
										<RadioGroupItem value="pt-br" id="option-one" />
										<Label htmlFor="option-one">Portuguese</Label>
									</div>
									<div className="flex items-center space-x-2">
										<RadioGroupItem value="en" id="option-two" />
										<Label htmlFor="option-two">English</Label>
									</div>
								</RadioGroup>
							</FormControl>
							<FormDescription>Your preference language.</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="theme_preferences"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Theme</FormLabel>
							<FormControl>
								<RadioGroup onValueChange={field.onChange} defaultValue={field.value} name="theme_preferences">
									<div className="flex items-center space-x-2">
										<RadioGroupItem value="dark" id="option-one" />
										<Label htmlFor="option-one">Dark</Label>
									</div>
									<div className="flex items-center space-x-2">
										<RadioGroupItem value="light" id="option-two" />
										<Label htmlFor="option-two">Light</Label>
									</div>
								</RadioGroup>
							</FormControl>
							<FormDescription>Your preference theme.</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="extra_verification"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Extra Verification</FormLabel>
							<FormControl>
								<RadioGroup onValueChange={field.onChange} name="extra_verification" defaultValue={field.value}>
									<div className="flex items-center space-x-2">
										<RadioGroupItem value="master_password" id="option-one" />
										<Label htmlFor="option-one">Master Password</Label>
									</div>
									<div className="flex items-center space-x-2">
										<RadioGroupItem value="secret_deterministic" id="option-two" />
										<Label htmlFor="option-two">Secret Code</Label>
									</div>
								</RadioGroup>
							</FormControl>
							<FormDescription>This is the method to will be used to authenticate you when you sing in on server.</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="code"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Code</FormLabel>
							<FormControl>
								<Input placeholder="code" {...field} />
							</FormControl>
							<FormDescription>Type code that will be use according with your preference extra verification.</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<ButtonSub />
			</form>
		</Form>
	)
}
