import GatewayPage from "./components/GatewayPage"
import GetTasks from "./services/getTasks"

import { Metadata } from "next"

export const metadata: Metadata = {
	title: "Grp@Server - Tasks",
	description: "See and add tasks to the server.",
	authors: [{ name: "Gabriel Santos" }],
	openGraph: {
		title: "Grp@Server - Tasks",
		description: "See and add tasks to the server.",
	},
}

export default async function Page() {
	const tasks = await GetTasks()
	return <GatewayPage tasksData={tasks} />
}
