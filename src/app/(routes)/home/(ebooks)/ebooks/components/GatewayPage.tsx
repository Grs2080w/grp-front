"use client"

import UseStyleBar from "@/hooks/use-style-bar"
import Breadcrumbs from "./Breadcrumbs"
import ListEbooks from "./ListEbooks"
import { Ebook } from "../services/getEbooks"

export default function GatewayPage({ ebooks }: { ebooks: Ebook[] }) {
	const { stylePage } = UseStyleBar()

	return (
		<div className={stylePage}>
			<Breadcrumbs />

			<h1 className="ml-[10px] mt-[40px] font-bold text-5xl">Ebooks</h1>

			<div className="mt-8 p-2">
				<ListEbooks Ebooks={ebooks} />
			</div>
		</div>
	)
}
