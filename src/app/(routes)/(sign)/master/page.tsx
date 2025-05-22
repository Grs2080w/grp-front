import { Metadata } from "next"
import ProfileForm from "./components/ProfileForm"
import Link from "next/link"

export const metadata : Metadata = {
	title: "Grp@Server - Master Password",
	description: "Login in a user account with the master Password",
	authors: [{ name: "Gabriel Santos" }],
	openGraph: {
		title: "Grp@Server - Master Password",
	  description: "Login in a user account with the master Password",
	},
  }

const styles = {
	container: "h-[100dvh] w-full flex items-center justify-center bg-zinc-900",
	box: "my-[100px] max-w-[85vw] text-center",
	title: "text-center text-5xl font-bold mb-[50px]",
	description: "my-5 font-bold text-gray-500",
	loginLink: "mt-5 text-cyan-900 hover:text-white hover:underline hover: font-bold active:underline active:text-white",
}

export default function Page() {
	return (
		<div className={styles.container}>
			<div className={styles.box}>
				<ProfileForm />
				<Link href={`/login`}>
					<p className={styles.loginLink}>Back to the login page</p>
				</Link>
			</div>
		</div>
	)
}
