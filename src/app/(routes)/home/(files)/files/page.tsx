import { FileByVersion } from "./components/table/Columns"
import GatewayPage from "./components/GatewayPage"
import GetFiles from "./services/getFiles"

import { Metadata } from "next"

export const metadata: Metadata = {
	title: "Grp@Server - Files",
	description: "See the files of a user.",
	authors: [{ name: "Gabriel Santos" }],
	openGraph: {
		title: "Grp@Server - Files",
		description: "See the files of a user.",
	},
}

async function getData(): Promise<FileByVersion[]> {
	return await GetFiles()
}

export default async function DemoPage() {
	const data = await getData()
	return <GatewayPage data={data} />
}
