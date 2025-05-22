"use client"

import UseStyleBar from "@/hooks/use-style-bar"
import Breadcrumbs from "./Breadcrumbs"
import ListPass from "./ListPass"
import { Pass } from "../services/getPass"

interface Props {
	data: Pass[]
}

export default function GatewayPage({ data }: Props) {
	const { stylePage } = UseStyleBar()

	return (
		<div className={stylePage}>
			<Breadcrumbs />

			<h1 className="ml-[10px] mt-[40px] font-bold text-5xl mb-5">Passwords</h1>

			<div className="flex flex-wrap gap-3 w-full justify-center items-center h-[70dvh] pr-[40px]">
				<ListPass data={data} />
			</div>
		</div>
	)
}
