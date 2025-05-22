"use client"

import * as React from "react"
import { Label, Pie, PieChart } from "recharts"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Metrics } from "../services/getMetrics"

const NameMetric = "Storage Per Domain"

const chartConfig = {
	visitors: {
		label: "Visitors",
	},
	chrome: {
		label: "Chrome",
		color: "hsl(var(--chart-1))",
	},
	safari: {
		label: "Safari",
		color: "hsl(var(--chart-2))",
	},
	firefox: {
		label: "Firefox",
		color: "hsl(var(--chart-3))",
	},
	edge: {
		label: "Edge",
		color: "hsl(var(--chart-4))",
	},
	other: {
		label: "Other",
		color: "hsl(var(--chart-5))",
	},
} satisfies ChartConfig

interface Props {
	data: Metrics
}

export default function GraphicsStoragePerDomain({ data }: Props) {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const chartData: any[] = Object.entries(data?.storage_per_domain).map(([ext, count], index) => ({
		browser: ext,
		data: count,
		fill: `hsl(var(--chart-${index + 1}))`,
	}))

	chartData.sort((a, b) => b.data - a.data)

	 
	const totalVisitors = React.useMemo(() => {
		return chartData.reduce((acc, curr) => acc + curr.data, 0)
	}, [chartData])

	return chartData.length > 0 && totalVisitors >= 1 ? (
		<Card className="flex flex-col bg-zinc-900 grow">
			<CardHeader className="items-center pb-0">
				<CardTitle>{NameMetric}</CardTitle>
				<CardDescription>This graphic show the {NameMetric}.</CardDescription>
			</CardHeader>
			<CardContent className="flex-1 pb-0">
				<ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[250px]">
					<PieChart>
						<ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
						<Pie data={chartData} dataKey="data" nameKey="browser" innerRadius={60} strokeWidth={5}>
							<Label
								content={({ viewBox }) => {
									if (viewBox && "cx" in viewBox && "cy" in viewBox) {
										return (
											<text x={viewBox.cx} y={viewBox.cy} textAnchor="middle" dominantBaseline="middle">
												<tspan x={viewBox.cx} y={viewBox.cy} className="fill-foreground text-3xl font-bold">
													{totalVisitors.toLocaleString()}
												</tspan>
												<tspan x={viewBox.cx} y={(viewBox.cy || 0) + 24} className="fill-muted-foreground">
													{NameMetric}
												</tspan>
											</text>
										)
									}
								}}
							/>
						</Pie>
					</PieChart>
				</ChartContainer>
			</CardContent>
			<CardFooter className="flex-col gap-2 text-sm">
				<div className="flex items-center gap-2 font-medium leading-none">
					The {chartData[0].browser.toUpperCase()} has more {NameMetric}.
				</div>
				<div className="leading-none text-muted-foreground">Showing total {NameMetric} in your server.</div>
			</CardFooter>
		</Card>
	) : (
		<Card className="flex items-center justify-center grow bg-zinc-900 h-105">
			<div className="wrap-break-word max-w-[60%]">No {NameMetric} to see, or the values are too low.</div>
		</Card>
	)
}
