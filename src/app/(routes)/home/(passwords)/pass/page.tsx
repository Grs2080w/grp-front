import GetPass, { Pass } from "./services/getPass"
import GatewayPage from "./components/GatewayPage"

import { Metadata } from "next"

export const metadata : Metadata = {
  title: "Grp@Server - Passwords",
  description: "See the passwords of a user account.",
  authors: [{ name: "Gabriel Santos" }],
  openGraph: {
    title: "Grp@Server - Passwords",
  description: "See the passwords of a user account.",
  },
}

export default async function Page() {
	const data: Pass[] = await GetPass()
	return <GatewayPage data={data} />
}
