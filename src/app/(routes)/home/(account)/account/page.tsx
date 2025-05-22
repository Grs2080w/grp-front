import GatewayPage from "./components/GatewayPage"
import GetServer from "./services/getServer"
import GetTimeForLogout from "./services/getTimeForLogout"
import GetUser, { User } from "./services/getUser"

import { Metadata } from "next"

export const metadata: Metadata = {
	title: "Grp@Server - Account",
	description: "See informations and change data about user account.",
	authors: [{ name: "Gabriel Santos" }],
	openGraph: {
		title: "Grp@Server - Account",
		description: "See informations and change data about user account.",
	},
}

export default async function Page() {
	const data: User = await GetUser()
	const server = await GetServer()
	const { timeLeftSec } = await GetTimeForLogout()

	return <GatewayPage data={data} server={server} timeLeftSec={timeLeftSec} />
}
