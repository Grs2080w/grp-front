"use server"

import OnSubmitUploadEbook from "./uploadEbook"

export async function OnSubmitAction({ ebook, ebookname, size, type, tags }) {
	const tagsNames = tags.map((tag) => tag.name)
	let formData = new FormData()

	formData.append("ebook", ebook)
	formData.append("name", ebookname)
	formData.append("size", size)
	formData.append("extension", type)
	formData.append("tags", JSON.stringify(tagsNames))

	return OnSubmitUploadEbook(formData).then((result) => {
		return result
	})
}
