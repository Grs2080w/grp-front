import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import mime from "mime"
import { Dispatch, SetStateAction } from "react"
import { UseFormReturn } from "react-hook-form"

interface Props {
	setFile: Dispatch<SetStateAction<File | undefined>>
	setFilename: Dispatch<SetStateAction<string>>
	filenameLabel: string
	setfilenameLabel: Dispatch<SetStateAction<string>>
	setSize: Dispatch<SetStateAction<number>>
	setType: Dispatch<SetStateAction<string>>
	form: UseFormReturn<
		{
			file: File
			filename: string
			size: number
			type: string
		},
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		any,
		{
			file: File
			filename: string
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

export default function RenderFilesInput({ setFile, setFilename, filenameLabel, setfilenameLabel, setSize, setType, form }: Props) {
	return (
		<FormField
			control={form.control}
			name="file"
			render={({ field }) => (
				<FormItem>
					<FormLabel>*File</FormLabel>
					<FormControl>
						<div className={styles.wrapper}>
							<Input
								className={styles.input}
								type="file"
								id="file"
								onChange={(e) => {
									const file = e.target.files?.[0]
									const indexBar = file?.name.lastIndexOf(".")
									setFile(file)
									setFilename(file!.name)
									setfilenameLabel(file!.name)
									setSize(file!.size ? Math.ceil(file!.size / 1024) : file!.size)
									//indexBar ? file!.name.substring(indexBar + 1) : file!.type
									setType(mime.getType(file!.name) ? mime.getType(file!.name)! : file!.type ? file!.type : indexBar ? file!.name.substring(indexBar! + 1) : file!.type)
									form.clearErrors("file")
									form.clearErrors("filename")
									form.clearErrors("type")
									form.clearErrors("size")
								}}
								ref={field.ref}
							/>
							<label className={styles.label} htmlFor="file">
								{filenameLabel ? (filenameLabel.length > 30 ? filenameLabel.substring(0, 29) + "..." : filenameLabel) : "No File. click to choice one"}
							</label>
						</div>
					</FormControl>
					<FormMessage />
				</FormItem>
			)}
		/>
	)
}
