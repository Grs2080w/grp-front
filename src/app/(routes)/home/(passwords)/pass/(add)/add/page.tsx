import GatewayPage from "./components/GatewayPage"

import { Metadata } from "next"

export const metadata : Metadata = {
  title: "Grp@Server - Add Password",
  description: "Add a password to the server.",
  authors: [{ name: "Gabriel Santos" }],
  openGraph: {
    title: "Grp@Server - Add Password",
  description: "Add a password to the server.",
  },
}

export default function Page() {
	return <GatewayPage />
}
