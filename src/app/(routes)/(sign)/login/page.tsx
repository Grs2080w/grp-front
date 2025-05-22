import ProfileForm from "./components/ProfileForm"

import { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
	title: "Grp@Server - Login",
	description: "Login in a user account",
	keywords: ["grpserver", "GrpServer", "grp@server", "server", "Server"],
	authors: [{ name: "Gabriel Santos" }],
	openGraph: {
		title: "Grp@Server - Login",
		description: "Login in a user account",
	},
}

const styles = {
	container: "h-[100dvh] w-full flex items-center justify-center bg-zinc-900",
	container2: "min-h-screen w-full flex items-center justify-center bg-zinc-900",
	box: "my-[100px] max-w-[85vw] text-center",
	title: "text-center text-5xl font-bold mb-[50px]",
	description: "my-5 font-bold text-gray-500",
	loginLink: "mt-5 text-cyan-900 hover:text-white hover:underline font-bold active:underline active:text-white",
}

export default function Page() {
	return (
		<div className={styles.container}>
			<div className={styles.container2}>
				<div className={styles.box}>
					<h1 className={styles.title}>Login</h1>
					<p className={styles.description}>Type the fields below to login in your user account. When you already, submit the form.</p>
					<ProfileForm />
					<div className="text-center">
						<Link href={"/create"}>
							<p className={styles.loginLink}>Do not have an account? Create</p>
						</Link>
					</div>
					<div className="text-center">
						<Link href={"/reset"}>
							<p className={styles.loginLink}>Forget the password? Reset</p>
						</Link>
					</div>
				</div>
			</div>
		</div>
	)
}
