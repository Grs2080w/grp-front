"use client"

import UseStyleBar from "@/hooks/use-style-bar"
import Breadcrumbs from "./Breadcrumbs"
import GraphicsFilesPerExtension from "./GraphicsPerExtension"
import GraphicsRecordsPerDomain from "./GraphicsRecordsPerDomain"
import GraphicsStoragePerDomain from "./GraphicsStoragePerDomain"
import GraphicsStoragePerType from "./GraphicsStoragePerType"
import { Metrics } from "../services/getMetrics"


interface Props {
	data: Metrics
}

export default function GatewayPage({ data }: Props) {
	const { stylePage } = UseStyleBar()

	return (
		<div className={stylePage}>
			<Breadcrumbs />

			<h1 className="ml-[10px] mt-[40px] font-bold text-5xl mb-5">Metrics</h1>

			<div className="flex flex-wrap gap-2 w-full justify-center items-center h-[70dvh] pr-[40px]">
				<GraphicsFilesPerExtension data={data} />
				<GraphicsRecordsPerDomain data={data} />
				<GraphicsStoragePerDomain data={data} />
				<GraphicsStoragePerType data={data} />
			</div>
		</div>
	)
}
