"use server"

import OnSubmitCreateUser from "./createUser"

interface Props {
	data: FormData
}

export async function OnSubmitAction({ data }: Props): Promise<string | undefined> {
	
	const values = {
		username: data.get("username")?.toString(),
		password: data.get("password")?.toString(),
		email: data.get("email")?.toString(),
		language: data.get("language")?.toString(),
		theme_preferences: data.get("theme_preferences")?.toString(),
		extra_verification: data.get("extra_verification")?.toString(),
		code: data.get("code")?.toString(),
	}
	
	return OnSubmitCreateUser(values).then((result) => {
		return result
	})
}
