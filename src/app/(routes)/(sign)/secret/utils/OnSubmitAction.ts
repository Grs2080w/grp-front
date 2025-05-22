"use server"

import OnSubmitLoginSecret from "./loginSecret"

interface Props {
	data: FormData
}

export async function OnSubmitAction({ data }: Props): Promise<string | undefined> {
	const value = {
		secret: data.get("secret")?.toString(),
	}

	return OnSubmitLoginSecret(value).then((result) => {
		return result
	})
}
