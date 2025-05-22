import { Button } from "@/components/ui/button"
import { ShieldBan } from "lucide-react"
import { Metadata } from "next"
import Link from "next/link"

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
	container: "h-[100dvh] w-full flex items-center justify-center bg-zinc-900",
	container2: "min-h-screen w-full flex items-center justify-center bg-zinc-900",
	box: "my-[100px] max-w-[85vw] text-center",
	title: "text-center text-5xl font-bold mb-[50px]",
	description: "my-5 font-bold text-gray-500",
	loginLink: "mt-5 text-cyan-900 hover:text-white hover:underline font-bold active:underline active:text-white",
    icon: "w-full flex items-center justify-center"
}

export default function Page() {
	return (
		<div className={styles.container}>
			<div className={styles.box}>
                <div className={styles.icon}><ShieldBan size={100} /></div>
				<h1 className={styles.title}>Unauthorized</h1>
				<p className={styles.description}>This page has been blocked to persons without authorization. Contact the administrator to have acess to this page.</p>
				<Link href={"/login"}>
					<Button className="hover:cursor-pointer">Back to the login page</Button>
				</Link>
			</div>
		</div>
	)
}
