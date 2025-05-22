"use server"

interface Props {
	username: string | undefined
	password: string | undefined
	email: string | undefined
	language: string | undefined
	theme_preferences: string | undefined
	extra_verification: string | undefined
	code: string | undefined
}

export default async function OnSubmitCreateUser(values: Props) {
	let response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users`, {
		method: "POST",
		body: JSON.stringify(values),
	})
		.then((res) => res.json())
		.then((data) => data)

	response = Object.values(response)[0]
	response = response ? response?.charAt(0).toUpperCase() + response?.slice(1) : response
	return response
}
