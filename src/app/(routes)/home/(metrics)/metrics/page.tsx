import GatewayPage from "./components/GatewayPage"
import GetMetrics from "./services/getMetrics"

import { Metadata } from "next"

export const metadata: Metadata = {
	title: "Grp@Server - Metrics",
	description: "See the metrics about a user account, like number of files, storage, etc.",
	authors: [{ name: "Gabriel Santos" }],
	openGraph: {
		title: "Grp@Server - Metrics",
		description: "See the metrics about a user account, like number of files, storage, etc.",
	},
}

export default async function Page() {
	const data = await GetMetrics()
	return <GatewayPage data={data} />
}
