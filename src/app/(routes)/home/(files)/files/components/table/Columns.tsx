"use client"

import { useState } from "react"
import { ColumnDef } from "@tanstack/react-table"

import { Button } from "@/components/ui/button"
import BadgeTags from "../../(add)/add/components/BadgeTags"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

import { FileIcon } from "../../utils/FileIcon"
import DeleteFile from "../../services/deleteFile"
import DownloadFile from "../../services/downloadFile"

const styles = {
	menuButton: "h-8 w-8 p-0",
	menuContent: "bg-zinc-900",
	headerRight: "text-right",
	sortIcon: "ml-2 h-4 w-4",
	tagWrapper: "",
}

export type FileByVersion = {
	Filename: string
	Extension: string
	Tags: string[]
	Date: string
	Id: string
	Is_latest: boolean
	Size: string
	Version: string
}

export const ColumnsName = ["Extension", "Filename", "Id", "Version", "Date", "Size"]

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const columns: ColumnDef<FileByVersion, any>[] = [
	{
		id: "actions",
		cell: ({ row }) => {
			const file = row.original
			// eslint-disable-next-line react-hooks/rules-of-hooks
			const [openDeleteDialog, setOpenDeleteDialog] = useState(false)

			const handleDelete = (id: string, filename: string, ext: string) => {
				DeleteFile(id, ext, filename)
				setOpenDeleteDialog(false)
			}

			return (
				<div>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant="ghost" className={styles.menuButton}>
								<span className="sr-only">Open menu</span>
								<MoreHorizontal className="h-4 w-4" />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end" className={styles.menuContent}>
							<DropdownMenuLabel>Actions</DropdownMenuLabel>
							<DropdownMenuItem onClick={() => DownloadFile(file.Id, file.Extension)}>Download File</DropdownMenuItem>
							<DropdownMenuSeparator />
							<DropdownMenuItem onClick={() => setOpenDeleteDialog(true)} variant="destructive">
								Delete File
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>

					<AlertDialog open={openDeleteDialog} onOpenChange={setOpenDeleteDialog}>
						<AlertDialogContent>
							<AlertDialogHeader>
								<AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
								<AlertDialogDescription>This action cannot be undone. This will permanently delete your file.</AlertDialogDescription>
							</AlertDialogHeader>
							<AlertDialogFooter>
								<AlertDialogCancel>Cancel</AlertDialogCancel>
								<AlertDialogAction onClick={() => handleDelete(file.Id, file.Filename, file.Extension)}>Continue</AlertDialogAction>
							</AlertDialogFooter>
						</AlertDialogContent>
					</AlertDialog>
				</div>
			)
		},
	},
	{
		accessorKey: "Extension",
		header: () => <div className={styles.headerRight}>Extension</div>,
		cell: ({ getValue }) => {
			const value = getValue() as string
			return <FileIcon type={value} />
		},
	},
	{
		accessorKey: "Filename",
		header: ({ column }) => {
			return (
				<Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
					Filename
					<ArrowUpDown className={styles.sortIcon} />
				</Button>
			)
		},
	},
	{
		accessorKey: "Size",
		header: ({ column }) => {
			return (
				<Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
					Size
					<ArrowUpDown className={styles.sortIcon} />
				</Button>
			)
		},
	},
	{
		accessorKey: "Version",
		header: ({ column }) => {
			return (
				<Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
					Version
					<ArrowUpDown className={styles.sortIcon} />
				</Button>
			)
		},
	},
	{
		accessorKey: "Is_latest",
		header: ({ column }) => {
			return (
				<Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
					Is Latest
					<ArrowUpDown className={styles.sortIcon} />
				</Button>
			)
		},
	},
	{
		accessorKey: "Date",
		header: ({ column }) => {
			return (
				<Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
					Date
					<ArrowUpDown className={styles.sortIcon} />
				</Button>
			)
		},
	},
	{
		accessorKey: "Id",
		header: ({ column }) => {
			return (
				<Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
					Id
					<ArrowUpDown className={styles.sortIcon} />
				</Button>
			)
		},
	},
	{
		accessorKey: "Tags",
		header: "Tags",
		cell: ({ row }) => {
			const TagsFile = row.original.Tags
			const style = `bg-white`

			return (
				<div className={styles.tagWrapper}>
					{TagsFile.map((name, id) => {
						return (
							<BadgeTags
								tag={{
									id,
									name,
									style,
								}}
								putButton={false}
								key={id}
							/>
						)
					})}
				</div>
			)
		},
	},
]
