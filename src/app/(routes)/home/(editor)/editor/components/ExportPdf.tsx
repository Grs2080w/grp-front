export const handleExport = async (html: string) => {
	const res = await fetch("/api/editor", {
		method: "POST",
		body: JSON.stringify({ html: html, filename: "NewDocument.pdf" }),
	})

	const blob = await res.blob()
	const url = URL.createObjectURL(blob)
	const a = document.createElement("a")
	a.href = url
	a.download = "NewDocument.pdf"
	a.click()
	URL.revokeObjectURL(url)
}
