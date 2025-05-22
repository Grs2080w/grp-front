"use client"

import "./globals.css"
import "quill/dist/quill.snow.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/sonner"
import { useEffect } from "react"

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	useEffect(() => {
		if ("serviceWorker" in navigator) {
			navigator.serviceWorker.register("/service-worker.js").then((registration) => console.log("scope is: ", registration.scope))
		}
	}, [])

	return (
		<html lang="en" suppressHydrationWarning>
			<head>
				<link rel="manifest" href="/manifest.json" />
				<meta name="theme-color" content="#18181b" />
			</head>
			<body>
				<ThemeProvider attribute="class" defaultTheme="dark" disableTransitionOnChange>
					<main className="bg-zinc-900">{children}</main>
					<Toaster />
				</ThemeProvider>
			</body>
		</html>
	)
}
