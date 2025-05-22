"use client"

import * as React from "react"

import { ColumnDef, ColumnFiltersState, SortingState, VisibilityState, flexRender, getCoreRowModel, getFilteredRowModel, getSortedRowModel, getPaginationRowModel, useReactTable } from "@tanstack/react-table"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

import { ColumnsName } from "./Columns"

const styles = {
	wrapper: "w-full",
	toolbar: "flex items-center py-4",
	input: "max-w-sm mr-1",
	dropdownContent: "bg-zinc-900",
	columnsButton: "ml-auto",
	columnsDropdownItem: "capitalize",
	tableWrapper: "rounded-md border mt-3",
	noResults: "h-24 text-center",
	paginationWrapper: "flex items-center justify-end space-x-2 py-4",
	rowsInfo: "flex-1 text-sm text-muted-foreground",
}

interface DataTableProps<TData, TValue> {
	columns: ColumnDef<TData, TValue>[]
	data: TData[]
}

export function DataTable<TData, TValue>({ columns, data }: DataTableProps<TData, TValue>) {
	const [sorting, setSorting] = React.useState<SortingState>([])
	const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
	const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
	const [columnSelectedToFilter, setColumnSelectedToFilter] = React.useState<string>("Date")

	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		onSortingChange: setSorting,
		getSortedRowModel: getSortedRowModel(),
		onColumnFiltersChange: setColumnFilters,
		getFilteredRowModel: getFilteredRowModel(),
		onColumnVisibilityChange: setColumnVisibility,
		state: {
			sorting,
			columnFilters,
			columnVisibility,
		},
		meta: {
			data,
		},
	})

	return (
		<div className={styles.wrapper}>
			<div className={styles.toolbar}>
				<Input placeholder={`Filter by ${columnSelectedToFilter}...`} value={(table.getColumn(columnSelectedToFilter)?.getFilterValue() as string) ?? ""} onChange={(event) => table.getColumn(columnSelectedToFilter)?.setFilterValue(event.target.value)} className={styles.input} />

				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="secondary">{columnSelectedToFilter}</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end" className={styles.dropdownContent}>
						{ColumnsName.map((name) => {
							return (
								<DropdownMenuItem
									onClick={() => {
										setColumnSelectedToFilter(name)
									}}
									key={name}
								>
									{name}
								</DropdownMenuItem>
							)
						})}
					</DropdownMenuContent>
				</DropdownMenu>
			</div>

			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant="outline" className={styles.columnsButton}>
						Columns
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align="end" className={styles.dropdownContent}>
					{table
						.getAllColumns()
						.filter((column) => column.getCanHide())
						.map((column) => {
							return (
								<DropdownMenuCheckboxItem key={column.id} className={styles.columnsDropdownItem} checked={column.getIsVisible()} onCheckedChange={(value) => column.toggleVisibility(!!value)}>
									{column.id}
								</DropdownMenuCheckboxItem>
							)
						})}
				</DropdownMenuContent>
			</DropdownMenu>
			<div className={styles.tableWrapper}>
				<Table>
					<TableHeader>
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map((header) => {
									return <TableHead key={header.id}>{header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}</TableHead>
								})}
							</TableRow>
						))}
					</TableHeader>
					<TableBody>
						{table.getRowModel().rows?.length ? (
							table.getRowModel().rows.map((row) => (
								<TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
									{row.getVisibleCells().map((cell) => (
										<TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
									))}
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell colSpan={columns.length} className={styles.noResults}>
									No results.
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>
			<div className={styles.paginationWrapper}>
				<div className={styles.rowsInfo}>{table.getFilteredRowModel().rows.length} rows</div>
				<Button variant="outline" size="sm" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
					Previous
				</Button>
				<Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
					Next
				</Button>
			</div>
		</div>
	)
}
