import GatewayPage from "./components/GatewayPage"
import GetEbooks from "./services/getEbooks"

import { Metadata } from "next"

export const metadata: Metadata = {
	title: "Grp@Server - Ebooks",
	description: "See the ebooks of a user.",
	authors: [{ name: "Gabriel Santos" }],
	openGraph: {
		title: "Grp@Server - Ebooks",
		description: "See the ebooks of a user.",
	},
}

export default async function Page() {
	const ebooks = await GetEbooks()

	return <GatewayPage ebooks={ebooks} />
}
