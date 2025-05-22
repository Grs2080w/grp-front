import "../../globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/sonner"

import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "./components/app-sidebar"
import { ButtonSideBar } from "./components/button-side-bar"

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<div className="bg-zinc-900">
			<ThemeProvider attribute="class" defaultTheme="dark" disableTransitionOnChange>
				<SidebarProvider defaultOpen>
					<AppSidebar />
					<ButtonSideBar />
					<main className="bg-zinc-900">{children}</main>
					<Toaster />
				</SidebarProvider>
			</ThemeProvider>
		</div>
	)
}
