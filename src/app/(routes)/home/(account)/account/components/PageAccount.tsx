"use client"

import { useState } from "react"

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Copy, Pencil } from "lucide-react"
import { toast } from "sonner"

// components

import ButtonSub from "./ButtonSub"
import DialogComponent from "./DialogComponent"

// services

import { User } from "../services/getUser"
import { Server } from "../services/getServer"
import SendOtp from "../services/sendOtp"
import changePhoto from "../services/changePhoto"
import UpdateEmail from "../services/updateEmail"
import updateTheme from "../services/updateTheme"
import updateLanguage from "../services/updateLanguage"

const styles = {
	pageWrapper: "mt-12 pb-12 pr-8",
	topRow: "flex justify-start items-center gap-7",
	avatarCol: "flex flex-col items-center-safe justify-start gap-8 h-[100px] mb-4",
	avatar: "w-35 h-35",
	changePhotoLabel: "font-bold bg-zinc-800 border-1 border-zinc-500 p-2 rounded-md hover:cursor-pointer hover:border-zinc-400 active:border-zinc-300 hover-bg-zinc-700",
	userInfoRow: "flex justify-between items-start h-[140px] w-full flex-wrap",
	username: "font-bold flex items-start",
	statusBlock: "font-bold flex gap-2",
	statusValue: "text-green-500",
	hua: "font-bold text-violet-800",
	section: "flex flex-col gap-3 items-start max-w-[600px] mb-3 mt-8",
	section2: "flex flex-col gap-3 items-start max-w-[600px] mb-3 mt-25",
	sectionTitle: "font-bold text-xl",
	sectionDesc: "text-gray-600 font-bold",
	inputRow: "flex gap-3 justify-between",
	input: "",
	copyButton: "",
	separator: "my-6",
	warnTitle: "font-bold text-xl mb-3 text-yellow-400",
	warnBox: "border-2 border-yellow-600 h-fit p-3 rounded-md flex flex-col items-start justify-center pl-5",
	trustButton: "bg-amber-300",
	timeRow: "flex gap-3 items-center my-3",
	timeTitle: "font-bold text-xl",
	timeValue: "font-bold bg-zinc-700 border-2 border-zinc-800 p-2 rounded-md",
}

interface Props {
	data: User
	server: Server
	isMobile: boolean
	timeLeftSec: number
}

export default function PageAccount({ data, server, isMobile, timeLeftSec }: Props) {
	const { username, theme_preferences, email, language, extra_verification, avatar_url } = data
	const [emailU, setEmailU] = useState(data.email)
	const [editEmail, setEditEmail] = useState<boolean>(true)
	const [themeU, setThemeU] = useState(data.theme_preferences)
	const [editTheme, setEditTheme] = useState<boolean>(true)
	const [languageU, setLanguageU] = useState(data.language)
	const [editLanguage, setEditLanguage] = useState<boolean>(true)
	const [exverifi, setExverifi] = useState(data.extra_verification)
	const [editExVeri, setEditExVeri] = useState<boolean>(true)
	const [masterU, setMasterU] = useState(data.master_password_hash)
	const [editMaster, setEditMaster] = useState<boolean>(true)
	const [secretU, setSecretU] = useState(data.secret_deterministic)
	const [editSecret, setEditSecret] = useState<boolean>(true)
	const [dialogOpen, setDialogOpen] = useState<boolean>(false)
	const [image, setImage] = useState<File | undefined>(undefined)

	async function UpdatePhoto(file: File | undefined) {
		if (!file) return
		const response = await changePhoto(file)
		if (response?.error) {
			toast.error(response.error)
		} else {
			toast.success("Photo updated")
			setTimeout(() => {}, 2000)
			window.location.reload()
		}
	}

	return (
		<div className={styles.pageWrapper}>
			<div className={styles.topRow}>
				<div className={styles.avatarCol}>
					<div>
						<Avatar className={styles.avatar}>
							<AvatarImage src={avatar_url} alt={username.charAt(0).toUpperCase()} />
							<AvatarFallback>{username.charAt(0).toUpperCase()}</AvatarFallback>
						</Avatar>
					</div>
					<div className="my-1">
						<form action={() => UpdatePhoto(image)}>
							<input
								accept="image/*"
								onChange={(e) => {
									if (e.target instanceof HTMLInputElement) {
										setImage(e.target.files?.[0])
									}
								}}
								className="hidden"
								type="file"
								name=""
								id="photo"
							/>
							{image && <ButtonSub />}
							{!image && (
								<label className={styles.changePhotoLabel} htmlFor="photo">
									Change foto
								</label>
							)}
						</form>
					</div>
				</div>
				<div className={styles.userInfoRow}>
					<div className={`${isMobile ? "text-[7vw]" : "text-[5vw]"} ${styles.username}`}>{username}</div>
					<div className={isMobile ? "text-[3vw]" : "pt-4"}>
						<div className={styles.statusBlock}>
							Status: <div className={styles.statusValue}>{server?.status}</div>
						</div>
						<div className={styles.hua}>HUA: {server?.HUA}</div>
					</div>
				</div>
			</div>

			<div className={styles.section2}>
				<p className={styles.sectionTitle}>Avatar Url</p>
				<div className={styles.sectionDesc}>It is your avatar url. You can not change, but can be copied.</div>
				<div className={styles.inputRow}>
					<Input disabled={true} value={avatar_url} className={styles.input} />

					<Button
						onClick={async () => {
							await navigator.clipboard.writeText(avatar_url).then(() => {
								toast.success("Copied to Clipboard")
							})
						}}
						className={styles.copyButton}
					>
						<Copy />
					</Button>
				</div>
			</div>

			<Separator orientation="horizontal" className={styles.separator} />

			<div className={styles.section}>
				<p className={styles.sectionTitle}>Email</p>
				<div className={styles.sectionDesc}>Your email. This email will be used to send otp codes and verify your credibility. Make a good choice.</div>
				<div className={styles.inputRow}>
					<Input disabled={editEmail} value={emailU} onChange={(e) => setEmailU(e.target.value)} className={styles.input} />
					{emailU == email && (
						<Button
							onClick={() => {
								setEditEmail(!editEmail)
							}}
						>
							<Pencil />
						</Button>
					)}
					{emailU != email && (
						<Button
							onClick={async () => {
								await UpdateEmail(emailU)
								setEditEmail(true)
							}}
						>
							Save
						</Button>
					)}
				</div>
			</div>

			<Separator orientation="horizontal" className={styles.separator} />

			<div className={styles.section}>
				<p className={styles.sectionTitle}>Master Password</p>
				<div className={styles.sectionDesc}>You can change the master password that you use to acess the server. You must remember it.</div>
				<div className={styles.inputRow + " max-w-[80vw] grow"}>
					<Input disabled={editMaster} value={masterU} onChange={(e) => setMasterU(e.target.value)} className={styles.input} />
					{masterU == data.master_password_hash && (
						<Button
							onClick={() => {
								setEditMaster(!editMaster)
							}}
						>
							<Pencil />
						</Button>
					)}
					{masterU != data.master_password_hash && (
						<Button
							onClick={async () => {
								await SendOtp("master", masterU, username)
								setEditMaster(true)
							}}
						>
							Save
						</Button>
					)}
				</div>
			</div>

			<Separator orientation="horizontal" className={styles.separator} />

			<div className={styles.section}>
				<p className={styles.sectionTitle}>Secret Deterministic</p>
				<div className={styles.sectionDesc}>You can change the secret code that you use to acess the server. You must remember it.</div>
				<div className={styles.inputRow}>
					<Input disabled={editSecret} value={secretU} onChange={(e) => setSecretU(e.target.value)} className={styles.input} />
					{secretU == data.secret_deterministic && (
						<Button
							onClick={() => {
								setEditSecret(!editSecret)
							}}
						>
							<Pencil />
						</Button>
					)}
					{secretU != data.secret_deterministic && (
						<Button
							onClick={async () => {
								await SendOtp("secret", secretU, username)
								setEditSecret(true)
							}}
						>
							Save
						</Button>
					)}
				</div>
			</div>

			<Separator orientation="horizontal" className={styles.separator} />

			<div className={styles.section}>
				<div className={styles.sectionTitle}>Extra Verification</div>
				<div className={styles.sectionDesc}>Your mode to acess the server. To use someone else is account, you must use the same mode, and the mode must be configurated.</div>

				<RadioGroup
					className="flex gap-3 flex-col mb-3"
					onValueChange={(value) => {
						setExverifi(value)
					}}
					defaultValue={extra_verification}
					disabled={editExVeri}
					name="extra_verification"
				>
					<div className="flex items-center space-x-2">
						<RadioGroupItem value="master_password" id="option-one" />
						<Label htmlFor="option-one">Master Password</Label>
					</div>
					<div className="flex items-center space-x-2">
						<RadioGroupItem value="secret_deterministic" id="option-two" />
						<Label htmlFor="option-two">Secret Deterministc</Label>
					</div>
				</RadioGroup>

				{exverifi == extra_verification && (
					<Button
						onClick={() => {
							setEditExVeri(!editExVeri)
						}}
					>
						Edit
					</Button>
				)}
				{exverifi != extra_verification && (
					<Button
						onClick={async () => {
							await SendOtp("type", exverifi, username)
							setEditExVeri(true)
						}}
					>
						Save
					</Button>
				)}
			</div>

			<Separator orientation="horizontal" className={styles.separator} />

			<div className={styles.section}>
				<div className={styles.sectionTitle}>Theme Preference</div>
				<div className={styles.sectionDesc}>Your theme preference.</div>
				<RadioGroup
					className="flex gap-3 flex-col mb-3"
					onValueChange={(value) => {
						setThemeU(value)
					}}
					defaultValue={theme_preferences}
					disabled={editTheme}
					name="language"
				>
					<div className="flex items-center space-x-2">
						<RadioGroupItem value="dark" id="option-one" />
						<Label htmlFor="option-one">Dark</Label>
					</div>
					<div className="flex items-center space-x-2">
						<RadioGroupItem value="light" id="option-two" />
						<Label htmlFor="option-two">Light</Label>
					</div>
				</RadioGroup>
				{themeU == theme_preferences && (
					<Button
						onClick={() => {
							setEditTheme(!editTheme)
						}}
					>
						Edit
					</Button>
				)}
				{themeU != theme_preferences && (
					<Button
						onClick={async () => {
							await updateTheme(themeU)
							setEditTheme(true)
						}}
					>
						Save
					</Button>
				)}
			</div>

			<Separator orientation="horizontal" className={styles.separator} />

			<div className={styles.section}>
				<div className={styles.sectionTitle}>Language</div>
				<div className={styles.sectionDesc}>You can change the language of the app.</div>

				<RadioGroup
					className="flex gap-3 flex-col mb-3"
					onValueChange={(value) => {
						setLanguageU(value)
					}}
					defaultValue={language}
					disabled={editLanguage}
					name="language"
				>
					<div className="flex items-center space-x-2">
						<RadioGroupItem value="pt-br" id="option-one" />
						<Label htmlFor="option-one">Portuguese</Label>
					</div>
					<div className="flex items-center space-x-2">
						<RadioGroupItem value="en" id="option-two" />
						<Label htmlFor="option-two">English</Label>
					</div>
					<div className="flex items-center space-x-2">
						<RadioGroupItem value="japanese" id="option-one" />
						<Label htmlFor="option-one">Japanese</Label>
					</div>
					<div className="flex items-center space-x-2">
						<RadioGroupItem value="chinese" id="option-two" />
						<Label htmlFor="option-two">Chinese</Label>
					</div>
				</RadioGroup>

				{languageU == language && (
					<Button
						onClick={() => {
							setEditLanguage(!editLanguage)
						}}
					>
						Edit
					</Button>
				)}
				{languageU != language && (
					<Button
						onClick={async () => {
							await updateLanguage(languageU)
							setEditLanguage(true)
						}}
					>
						Save
					</Button>
				)}
			</div>

			<Separator orientation="horizontal" className={styles.separator} />

			<div className={styles.warnTitle}>Warn Area</div>

			<div className={styles.warnBox}>
				<Button onClick={() => setDialogOpen(true)} variant={"outline"} className={styles.trustButton}>
					Trust this device
				</Button>

				<div className="text-gray-600 font-bold mt-3">Caution! On trust in this device, you will can sign in without username, password and extra verification, for 30 days. But if you do not trust this device, you not must activate this. If by a mistake this device is trusted, you can remove it sign out and sign in again.</div>
			</div>

			<Separator orientation="horizontal" className={styles.separator + " mb-2"} />

			<div className={styles.timeRow}>
				<div className={styles.timeTitle}>Time For Logout:</div>
				<div className={styles.timeValue}>{timeLeftSec > 60 && timeLeftSec < 60 * 60 ? `${Math.floor(timeLeftSec / 60)} minutes` : timeLeftSec > 60 * 60 * 24 ? `${Math.floor(timeLeftSec / (60 * 60 * 24))} days` : timeLeftSec > 60 * 60 && timeLeftSec < 60 * 60 * 24 ? `${Math.floor(timeLeftSec / (60 * 60))} hours` : `${timeLeftSec} seconds`}</div>
			</div>

			<DialogComponent dialogOpen={dialogOpen} setDialogOpen={setDialogOpen} />
		</div>
	)
}
