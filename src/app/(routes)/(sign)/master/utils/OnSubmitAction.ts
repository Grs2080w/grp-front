"use server"

import OnSubmitLoginMaster from "./loginMaster"

interface Props {
	data: FormData
}

export async function OnSubmitAction({ data }: Props): Promise<string | undefined> {
	const value = {
		master: data.get("master")?.toString(),
	}

	return OnSubmitLoginMaster(value).then((result) => {
		return result
	})
}
