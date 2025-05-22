import Link from "next/link"
import ProfileForm from "./components/ProfileForm"

import { Metadata } from "next"

export const metadata : Metadata = {
  title: "Grp@Server - Reset",
  description: "Reset the password of a user account",
  authors: [{ name: "Gabriel Santos" }],
  openGraph: {
	title: "Grp@Server - Reset",
	description: "Reset the password of a user account",
  },
}

export default function Page() {
	const styles = {
		container: "h-[100dvh] w-full flex items-center justify-center bg-zinc-900",
		container2: "min-h-screen w-full flex flex-col items-center justify-center bg-zinc-900",
		box: "my-[20px] max-w-[75vw] text-center",
		title: "text-center text-5xl font-bold mb-[50px]",
		description: "my-5 font-bold text-gray-500",
		loginLink: "text-cyan-900 hover:text-white hover:underline font-bold active:underline active:text-white",
	}

	return (
		<div className={styles.container}>
			<div className={styles.container2}>
				<div className={styles.box}>
					<h1 className={styles.title}>Reset Pass</h1>
					<p className={styles.description}>Type the fields below to reset your user password. When you already, submit the form click in reset button.</p>
					<ProfileForm />
				</div>
				<div className="text-center">
					<Link href={"/login"}>
						<p className={styles.loginLink}>Back to the Login Page</p>
					</Link>
				</div>
			</div>
		</div>
	)
}
