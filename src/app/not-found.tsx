import Image from "next/image"
import Link from "next/link"

export default function Page() {
	return (
		<div className="bg-zinc-900 text-white h-screen flex flex-col justify-center items-center text-center">
			<Image src="/logo_white.svg" width={96} height={96} alt="Logo do Projeto" className="w-24 h-24 mb-6" />

			<h1 className="text-5xl font-bold mb-4">Oops! 404</h1>
			<p className="text-lg text-gray-400 mb-6 max-w-[90vw]">The page you are looking for does not exist or has been removed.</p>

			<Link href="/" className="bg-white text-black px-6 py-2 rounded-full font-semibold hover:bg-gray-200 transition">
				Back to the home
			</Link>

			<footer className="absolute bottom-4 text-sm text-gray-500">&copy; 2025 {process.env.NEXT_NAME_SERVER}. All rights reserved.</footer>
		</div>
	)
}
