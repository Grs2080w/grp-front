"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Ebook } from "../services/getEbooks"

import { useState } from "react"
import DropdownEbook from "./DropdownEbook"
import AlertDialogEbook from "./AlertDialogEbook"
import Image from "next/image"

export default function ListEbooks({ Ebooks }: { Ebooks: Ebook[] }) {
	const [dialogOpen, setDialogOpen] = useState(false)

	const styles = {
		photoWithoutImageEpub: " border-1 rounded-lg w-[210px] h-[250px] grow flex text-blue-800 text-2xl font-bold items-center justify-center",
		photoWithoutImagePdf: " border-1 rounded-lg w-[210px] h-[200px] grow flex text-red-600 text-2xl font-bold items-center justify-center",
		card: "max-w-[380px] flex-col justify-between grow bg-zinc-900",
		wrapper: "flex flex-wrap gap-6 pr-[30px]",
		cardTitle: "font-bold min-w-[100px] mr-[10px]",
		cardHeader: "flex justify-between items-end",
	}

	return (
		<div className={styles.wrapper}>
			{Ebooks?.length > 0 ? (
				Ebooks?.map((ebook: Ebook, id: number) => {
					return (
						<div key={id}>
							<Card className={styles.card}>
								<CardContent className="flex grow">{ebook.UrlImage != "" ? <Image className=" rounded-lg" src={ebook.UrlImage} alt="ebook" width={210} height={200} /> : <div className={ebook.Extension === ".pdf" ? styles.photoWithoutImagePdf : ebook.Extension === ".epub" ? styles.photoWithoutImageEpub : styles.photoWithoutImagePdf}>{ebook.Extension.substring(1).toUpperCase()}</div>}</CardContent>
								<CardHeader>
									<div className={styles.cardHeader}>
										<CardTitle>
											<p className={styles.cardTitle}>{ebook.Name}</p>
										</CardTitle>
										<DropdownEbook setDialogOpen={setDialogOpen} ebook={ebook} />
									</div>
								</CardHeader>
							</Card>
							<AlertDialogEbook ebook={ebook} dialogOpen={dialogOpen} setDialogOpen={setDialogOpen} />
						</div>
					)
				})
			) : (
				<div className="flex items-center justify-center w-[80dvw] h-[50dvh] font-semibold text-xl text-gray-700">No Ebooks to see...</div>
			)}
		</div>
	)
}
