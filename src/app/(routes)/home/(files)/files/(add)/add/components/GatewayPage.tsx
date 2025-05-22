"use client"

import UseStyleBar from "@/hooks/use-style-bar"
import Breadcrumbs from "./Breadcrumbs"
import ProfileForm from "./ProfileForm"

const styles = {
	title: "ml-[10px] mt-[40px] font-bold text-5xl",
	container: "max-w-[90dvw] flex-col justify-center items-center pb-20",
	formWrapper: "max-w-[500px] mt-8 mr-[40px]",
}

export default function GatewayPage() {
	const { stylePage } = UseStyleBar()
	return (
		<div className={stylePage}>
			<Breadcrumbs />
			<h1 className={styles.title}>Add File</h1>

			<div className={styles.container}>
				<div className={styles.formWrapper}>
					<ProfileForm />
				</div>
			</div>
		</div>
	)
}
