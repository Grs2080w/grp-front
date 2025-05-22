"use client"

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { EllipsisVertical } from "lucide-react"
import { Ebook } from "../services/getEbooks"
import DownloadEbook from "../services/dowloadEbook"

import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { useState } from "react"
import BadgeTags from "./BadgeTags"

interface Props {
	setDialogOpen: React.Dispatch<React.SetStateAction<boolean>>
	ebook: Ebook
}

const styles = {
	trigger: "hover:bg-gray-700 rounded-full p-2 flex justify-center items-center h-fit hover:cursor-pointer border-0 outline-0",
	content: "bg-zinc-900",
	sheetContent: "bg-zinc-900",
	title: "font-bold text-3xl",
	label: "font-bold",
	row: "mt-3",
	rowFlex: "mt-3 flex gap-2",
}

export default function DropdownEbook({ setDialogOpen, ebook }: Props) {
	const [sheetOpen, setSheetOpen] = useState(false)

	return (
		<div>
			<DropdownMenu>
				<DropdownMenuTrigger className={styles.trigger}>
					<EllipsisVertical />
				</DropdownMenuTrigger>
				<DropdownMenuContent className={styles.content}>
					<DropdownMenuItem className="hover:cursor-pointer" onClick={() => DownloadEbook(ebook.Id, ebook.Extension)}>
						Download
					</DropdownMenuItem>
					<DropdownMenuItem onClick={() => setSheetOpen(true)} className="hover:cursor-pointer">
						See Details
					</DropdownMenuItem>
					<DropdownMenuSeparator />
					<DropdownMenuItem className="hover:cursor-pointer" variant="destructive" onClick={() => setDialogOpen(true)}>
						Delete
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
			<Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
				<SheetContent className={styles.sheetContent}>
					<SheetHeader>
						<SheetTitle>
							<div className={styles.title}>Details</div>
						</SheetTitle>
						<SheetDescription>See more details about ebook below.</SheetDescription>

						<div className={styles.row}>
							<p className={styles.label}>Name:</p>
							<p>{ebook.Name}</p>
						</div>

						<div className={styles.row}>
							<p className={styles.label}>Extension:</p>
							<p>{ebook.Extension.substring(1).toUpperCase()}</p>
						</div>

						<div className={styles.rowFlex}>
							<p className={styles.label}>Date:</p>
							<div>{ebook.Date}</div>
						</div>

						<div className={styles.rowFlex}>
							<p className={styles.label}>Size:</p>
							<div>{ebook.Size} Kb</div>
						</div>

						<div className={styles.rowFlex}>
							<p className={styles.label}>Id:</p>
							<div>{ebook.Id}</div>
						</div>

						<div className={styles.rowFlex}>
							<p className={styles.label}>Tags:</p>
							<div>{ebook.Tags.length > 0 ? ebook.Tags.map((tag, index) => <BadgeTags tag={{ name: tag, style: "bg-white", id: index }} key={index} putButton={false} />) : <p>None</p>}</div>
						</div>
					</SheetHeader>
				</SheetContent>
			</Sheet>
		</div>
	)
}
