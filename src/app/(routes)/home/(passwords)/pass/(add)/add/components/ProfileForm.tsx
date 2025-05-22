"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"

import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Tag } from "lucide-react"
import { handleCapture } from "../utils/handle-capture"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import RenderTagsInput from "./RenderTags"
import ButtonSub from "./ButtonSub"
import { Switch } from "@/components/ui/switch"
import AddPass from "../services/addPass"

interface Tag {
	name: string
	style: string
	id: number
}

export default function ProfileForm() {
	const [identifier, setIdentifier] = useState("")
	const [master, setMaster] = useState("")
	const [mode, setMode] = useState<"auto" | "manual">("auto")
	const [length, setLength] = useState<number>(10)
	const [digits, setDigits] = useState(true)
	const [lowercase_letters, setLowercase_letters] = useState(true)
	const [special_characters, setSpecial_characters] = useState(true)
	const [uppercase_letters, setUppercase_letters] = useState(true)
	const [password, setPassword] = useState("")
	const [tags, setTags] = useState<Tag[]>([])
	const [tagName, setTagName] = useState<string>("")

	const form = useForm({
		defaultValues: {
			identifier: "",
			master: "",
			mode: "auto",
			digits: false,
			length: 16,
			lowercase_letters: true,
			special_characters: false,
			uppercase_letters: true,
			password: "",
			tags: [],
		},
	})

	return (
		<Form {...form}>
			<form
				className="space-y-8 text-left pb-12"
				action={async () => {
					const tagsName = tags.map((tag) => tag.name)
					await AddPass({ identifier, master, mode, params: { digits, length, lowercase_letters, special_characters, uppercase_letters }, password, tags: tagsName })
				}}
				onSubmitCapture={(event) => handleCapture({ event, identifier, master, mode, password, params: { digits, length, lowercase_letters, special_characters, uppercase_letters }, form })}
			>
				<FormField
					control={form.control}
					name="identifier"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Identifier</FormLabel>
							<FormControl>
								<Input
									autoComplete="false"
									placeholder="Identifier"
									value={identifier}
									onChange={(e) => {
										setIdentifier(e.target.value.trim())
										form.clearErrors("identifier")
									}}
									ref={field.ref}
								/>
							</FormControl>
							<FormDescription>The identifier of your password. It is the place where you commonly will use this password.</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="master"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Master Password</FormLabel>
							<FormControl>
								<Input
									autoComplete="false"
									placeholder="Master Password"
									type="password"
									value={master}
									onChange={(e) => {
										setMaster(e.target.value.trim())
										form.clearErrors("master")
									}}
									ref={field.ref}
								/>
							</FormControl>
							<FormDescription>The Master Password. It is the password that will be used to encrypt your password. You must know this password for acess the password.</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="mode"
					render={({}) => (
						<FormItem>
							<FormLabel>Mode</FormLabel>
							<FormControl>
								<RadioGroup
									onValueChange={() => {
										setMode(mode === "auto" ? "manual" : "auto")
										form.clearErrors("password")
										form.clearErrors("length")
									}}
									defaultValue={mode}
									name="language"
								>
									<div className="flex items-center space-x-2">
										<RadioGroupItem value="auto" id="option-one" />
										<Label htmlFor="option-one">Auto</Label>
									</div>
									<div className="flex items-center space-x-2">
										<RadioGroupItem value="manual" id="option-two" />
										<Label htmlFor="option-two">Manual</Label>
									</div>
								</RadioGroup>
							</FormControl>
							<FormDescription>Your preference mode to create your password.</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="length"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Length</FormLabel>
							<FormControl>
								<Input
									disabled={mode === "manual"}
									autoComplete="false"
									type="number"
									value={length}
									onChange={(e) => {
										setLength(Number(e.target.value))
										form.clearErrors("length")
									}}
									ref={field.ref}
								/>
							</FormControl>
							<FormMessage />
							<FormDescription>The length of your password.</FormDescription>
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="digits"
					render={({}) => (
						<FormItem>
							<FormControl>
								<div className="flex items-center space-x-2">
									<Switch disabled={mode === "manual"} id="digits" checked={digits} onCheckedChange={() => setDigits(!digits)} />
									<Label htmlFor="digits">Digits</Label>
								</div>
							</FormControl>
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="lowercase_letters"
					render={({}) => (
						<FormItem>
							<FormControl>
								<div className="flex items-center space-x-2">
									<Switch disabled={mode === "manual"} id="lowercase_letters" checked={lowercase_letters} onCheckedChange={() => setLowercase_letters(!lowercase_letters)} />
									<Label htmlFor="lowercase_letters">Lowercase Letters</Label>
								</div>
							</FormControl>
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="uppercase_letters"
					render={({}) => (
						<FormItem>
							<FormControl>
								<div className="flex items-center space-x-2">
									<Switch disabled={mode === "manual"} id="uppercase_letters" checked={uppercase_letters} onCheckedChange={() => setUppercase_letters(!uppercase_letters)} />
									<Label htmlFor="uppercase_letters">Uppercase Letters</Label>
								</div>
							</FormControl>
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="special_characters"
					render={({}) => (
						<FormItem>
							<FormControl>
								<div className="flex items-center space-x-2">
									<Switch disabled={mode === "manual"} id="special_characters" checked={special_characters} onCheckedChange={() => setSpecial_characters(!special_characters)} />
									<Label htmlFor="special_characters">Special Letters</Label>
								</div>
							</FormControl>
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="password"
					render={({field}) => (
						<FormItem>
							<FormLabel>Password</FormLabel>
							<FormControl>
								<Input
									disabled={mode === "auto"}
									autoComplete="false"
									placeholder="password"
									type="password"
									value={password}
									onChange={(e) => {
										setPassword(e.target.value.trim())
										form.clearErrors("password")
									}}
									ref={field.ref}
								/>
							</FormControl>
							<FormDescription>The Password for your identifier.</FormDescription>
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
