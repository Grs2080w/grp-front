import { Metadata } from "next"
import GatewayPage from "./components/GatewayPage"

export const metadata: Metadata = {
	title: "Grp@Server - Editor",
	description: "Page with a editor for the user to write some document.",
	authors: [{ name: "Gabriel Santos" }],
	openGraph: {
		title: "Grp@Server - Editor",
		description: "Page with a editor for the user to write some document.",
	},
}

export default function Page() {
	return <GatewayPage />
}
