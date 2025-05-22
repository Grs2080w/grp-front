import { Metadata } from "next"
import GatewayPage from "./components/GatewayPage"

export const metadata : Metadata = {
  title: "Grp@Server - Add Files",
  description: "Page for the user add a file to the server.",
  authors: [{ name: "Gabriel Santos" }],
  openGraph: {
    title: "Grp@Server - Add Files",
    description: "Page for the user add a file to the server.",
  },
}


export default function Page() {
    return <GatewayPage />
}