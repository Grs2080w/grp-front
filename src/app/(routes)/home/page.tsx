import { Metadata } from "next"
import GatewayPage from "./components/GatewayPage"
import { getUserProfile } from "./services/getUserProfile"
import GetWeather from "./services/getWheater"

export const metadata: Metadata = {
	title: "Grp@Server - Home",
	description: "Home of a user account.",
	authors: [{ name: "Gabriel Santos" }],
	openGraph: {
		title: "Grp@Server - Home",
		description: "Home of a user account.",
	},
}

export default async function Page() {
	const userProfile = await getUserProfile()
	const wheather = await GetWeather()
	return <GatewayPage userProfile={userProfile} weatherResponse={wheather} />
}
