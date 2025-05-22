"use server"

import OnSubmitLogin from "./loginUser"

interface Props {
	data: FormData
}

export async function OnSubmitAction({ data }: Props): Promise<string | undefined> {
	const value = {
		username: data.get("username")?.toString(),
		password: data.get("password")?.toString(),
	}

	return OnSubmitLogin(value).then((result) => {
		return result
	})
}
