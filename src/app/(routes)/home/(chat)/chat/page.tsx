import GatewayPage from "./components/GatewayPage"
import GetMessages from "./services/getMessages"

import { Metadata } from "next"

export const metadata: Metadata = {
	title: "Grp@Server - Chat",
	description: "Chat for see the messages of a user.",
	authors: [{ name: "Gabriel Santos" }],
	openGraph: {
		title: "Grp@Server - Chat",
		description: "Chat for see the messages of a user.",
	},
}

export default async function Page() {
	const messages = await GetMessages()
	return <GatewayPage data={messages} />
}
