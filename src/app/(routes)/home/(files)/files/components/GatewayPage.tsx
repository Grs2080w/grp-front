"use client"

import UseStyleBar from "@/hooks/use-style-bar"
import { DataTable } from "./table/DataTable"
import { FileByVersion, columns } from "./table/Columns"
import Breadcrumbs from "./BreadCrumbs"

interface Props {
	data: FileByVersion[]
}

export default function GatewayPage({ data }: Props) {
	const { isMobile, stylePage } = UseStyleBar()

	return (
		<div className={stylePage}>
			<Breadcrumbs />

			<h1 className="ml-[10px] mt-[40px] font-bold text-5xl">Files</h1>

			<div className={`container py-10 ${isMobile ? "max-w-[85vw] pr-9" : "w-[calc(100vw-25rem)] mx-auto"} `}>
				<DataTable columns={columns} data={data} />
			</div>
		</div>
	)
}
