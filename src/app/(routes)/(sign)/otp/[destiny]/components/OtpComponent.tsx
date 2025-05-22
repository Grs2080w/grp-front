"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp"
import FetchOtp from "../services/fetchOtp"
import { toast } from "sonner"
import ButtonSub from "./buttonSub"

const styles = {
	form: "text-center space-y-2",
	formItem: "text-center",
	labelWrapper: "flex justify-center w-full",
	inputWrapper: "flex justify-center w-full",
	formControl: "text-center",
	otp: "text-center",
	separator: "bg-white rounded-full w-1 h-1 m-3",
}

const FormSchema = z.object({
	pin: z.string().min(6, {
		message: "Your one-time password must be 6 characters.",
	}),
})

type Verification = "master" | "secret" | "type" | "password"

interface Props {
	destiny: Verification
}

export function OtpComponent({ destiny }: Props) {
	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			pin: "",
		},
	})

	const handleCapture = async (e: React.FormEvent) => {
		const valid = await form.trigger()
		if (!valid) e.preventDefault() 
	}

	async function onSubmit(data: FormData) {
		const [error, notOk] = await FetchOtp(destiny, data.get("pin") as string)

		if (notOk) {
			if (error === "Code not found, try send the code again" || error === 'user not found') {
				toast.error(error)
				setTimeout(() => {
					window.location.href = "/home/account"
				}, 2000)
			} else {
				toast.error(error)
				form.reset()
			}
		}
	}

	return (
		<Form {...form}>
			<form onSubmitCapture={handleCapture} action={(data) => onSubmit(data)} className={styles.form}>
				<FormField
					control={form.control}
					name="pin"
					render={({ field }) => (
						<FormItem className={styles.formItem}>
							<div className={styles.labelWrapper}>
								<FormLabel>One-Time Password</FormLabel>
							</div>
							<div className={styles.inputWrapper}>
								<FormControl className={styles.formControl}>
									<InputOTP autoFocus className={styles.otp} maxLength={6} {...field}>
										<InputOTPGroup autoFocus>
											<InputOTPSlot index={0} />
											<InputOTPSlot index={1} />
											<InputOTPSlot index={2} />
											<div className={styles.separator} />
											<InputOTPSlot index={3} />
											<InputOTPSlot index={4} />
											<InputOTPSlot index={5} />
										</InputOTPGroup>
									</InputOTP>
								</FormControl>
							</div>
							<FormDescription>Please enter the one-time password sent to your email. If you wait more than 5 minutes, you can try send anyone code for more informations.</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>

				<ButtonSub />
			</form>
		</Form>
	)
}
