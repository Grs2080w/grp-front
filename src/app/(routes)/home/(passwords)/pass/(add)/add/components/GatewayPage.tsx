"use client"

import UseStyleBar from "@/hooks/use-style-bar"
import Breadcrumbs from "./Breadcrumbs"
import ProfileForm from "./ProfileForm"

export default function GatewayPage() {
	const { stylePage } = UseStyleBar()

	return (
		<div className={stylePage}>
			<Breadcrumbs />

			<h1 className="ml-[10px] mt-[40px] font-bold text-5xl mb-5">Add Password</h1>

			<div className="flex flex-wrap gap-3 w-full justify-start items-center h-[80dvh] pr-[40px] mt-15">
				<ProfileForm />
			</div>
		</div>
	)
}
