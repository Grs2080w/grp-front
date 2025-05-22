import { OtpComponent } from "./components/OtpComponent"
import Link from "next/link"

import { Metadata } from "next"

export const metadata : Metadata = {
  title: "Grp@Server - Otp",
  description: "Verify a otp code sent for a user",
  authors: [{ name: "Gabriel Santos" }],
  openGraph: {
	title: "Grp@Server - Otp",
	description: "Verify a otp code sent for a user",
  },
}

type Verification = "master" | "secret" | "type" | "password"

interface Props {
	params: Promise<{ destiny: Verification }>
}

export default async function Page({ params }: Props) {
	const { destiny } = await params

	return (
		<div className="w-screen h-screen flex justify-center items-center">
			<div className="flex flex-col gap-4 h-[100dvh] w-screen max-w-[80vw] items-center justify-center bg-zinc-900">
				<OtpComponent destiny={destiny} />
				<div>
					<Link className="mt-5 text-cyan-900 hover:text-white hover:underline font-bold active:underline active:text-white" href={destiny != "password" ? `/home/account` : `/login`}>
						Back to the previous page
					</Link>
				</div>
			</div>
		</div>
	)
}
