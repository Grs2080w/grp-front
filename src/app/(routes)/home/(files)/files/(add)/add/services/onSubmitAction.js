"use server"

import OnSubmitLoginSecret from "./uploadFile"

export async function OnSubmitAction({ file, filename, size, type, tags }) {
	const tagsNames = tags.map((tag) => tag.name)
	let formData = new FormData()
	
	formData.append("file", file)
	formData.append("filename", filename)
	formData.append("size", size)
	formData.append("type", type)
	formData.append("tags", JSON.stringify(tagsNames))

	return OnSubmitLoginSecret(formData).then((result) => {
		return result
	})
}
