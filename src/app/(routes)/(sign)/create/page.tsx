import ProfileForm from "./components/ProfileForm"
import Link from "next/link"

import { Metadata } from "next"

export const metadata: Metadata = {
	title: "Grp@Server - Create User",
	description: "Page to create a user account",
	authors: [{ name: "Gabriel Santos" }],
	openGraph: {
		title: "Grp@Server - Create User",
		description: "Page to create a user account",
	},
}

const styles = {
	container: "min-h-screen w-full flex items-center justify-center bg-zinc-900",
	box: "my-[100px] text-center max-w-[85vw]",
	title: "text-center text-5xl font-bold mb-[50px]",
	description: "my-5 font-bold text-gray-500",
	loginLink: "mt-5 text-cyan-900 hover:text-white hover:underline font-bold active:underline active:text-white",
}

export default function Page() {
	return (
		<div className={styles.container}>
			<div className={styles.box}>
				<h1 className={styles.title}>Create user</h1>
				<p className={styles.description}>Type the fields below to create a user account. When you already, submit the form.</p>
				<ProfileForm />
				<Link href={"/login"}>
					<p className={styles.loginLink}>Already have an account? Log in</p>
				</Link>
			</div>
		</div>
	)
}
