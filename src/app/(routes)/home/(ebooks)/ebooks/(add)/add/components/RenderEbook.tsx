import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import mime from "mime"
import { Dispatch, SetStateAction } from "react"
import { UseFormReturn } from "react-hook-form"

interface Props {
	setEbook: Dispatch<SetStateAction<File | undefined>>
	setEbookname: Dispatch<SetStateAction<string>>
	nameLabel: string
	setEbooknameLabel: Dispatch<SetStateAction<string>>
	setSize: Dispatch<SetStateAction<number>>
	setType: Dispatch<SetStateAction<string>>
	form: UseFormReturn<
		{
			ebook: File
			ebookname: string
			size: number
			type: string
		},
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		any,
		{
			ebook: File
			ebookname: string
			size: number
			type: string
		}
	>
}

const styles = {
	wrapper: "my-4 w-full",
	input: "hidden",
	label: "border-2 border-gray-700 border-dashed h-36 p-4 rounded-md hover:border-gray-500 active:border-gray-400 hover:cursor-pointer",
}

export default function RenderEbookInput({ setEbook, setEbookname, nameLabel, setEbooknameLabel, setSize, setType, form }: Props) {
	return (
		<FormField
			control={form.control}
			name="ebook"
			render={({ field }) => (
				<FormItem>
					<FormLabel>*ebook</FormLabel>
					<FormControl>
						<div className={styles.wrapper}>
							<Input
								className={styles.input}
								type="file"
								id="ebook"
								onChange={(e) => {
									const ebook = e.target.files?.[0]
									const indexBar = ebook?.name.lastIndexOf(".")
									setEbook(ebook)
									setEbookname(ebook!.name)
									setEbooknameLabel(ebook!.name)
									setSize(ebook!.size ? Math.ceil(ebook!.size / 1024) : ebook!.size)
									setType(mime.getType(ebook!.name) ? mime.getType(ebook!.name)! : ebook!.type ? ebook!.type : indexBar ? ebook!.name.substring(indexBar! + 1) : ebook!.type)
									form.clearErrors("ebook")
									form.clearErrors("ebookname")
									form.clearErrors("type")
									form.clearErrors("size")
								}}
								ref={field.ref}
							/>
							<label className={styles.label} htmlFor="ebook">
								{nameLabel ? (nameLabel.length > 30 ? nameLabel.substring(0, 29) + "..." : nameLabel) : "No Ebook. click to choice one"}
							</label>
						</div>
					</FormControl>
					<FormMessage />
				</FormItem>
			)}
		/>
	)
}
