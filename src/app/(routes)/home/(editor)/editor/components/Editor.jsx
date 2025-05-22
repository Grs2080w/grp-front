import React, { useRef } from "react"
import { Editor } from "@tinymce/tinymce-react"
import { handleExport } from "./ExportPdf"
import { Button } from "@/components/ui/button"
import { FileDown } from "lucide-react"

export default function EditorComponent() {
	const editorRef = useRef(null)

	return (
		<div>

				<Editor
					apiKey="0dfq4xz6apotwon3pdvvfjwkv3n129do5lscxlg2jiowbzwv"
					onInit={(evt, editor) => (editorRef.current = editor)}
					init={{
						plugins: "anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount",
						toolbar: "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat",
						entity_encoding: "raw",
					}}
				/>
		
			<Button className="mt-2 hover:cursor-pointer" variant={"outline"} onClick={() => handleExport(editorRef.current.getContent())}>Exportar PDF<FileDown /></Button>
		</div>
	)
}
