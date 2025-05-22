import { Metadata } from "next"
import GatewayPage from "./components/GatewayPage"

export const metadata : Metadata = {
  title: "Grp@Server - Add Ebook",
  description: "Page to add a ebook to the server.",
  authors: [{ name: "Gabriel Santos" }],
  openGraph: {
    title: "Grp@Server - Add Ebook",
  description: "Page to add a ebook to the server.",
  },
}

export default function Page() {
    return <GatewayPage />
}