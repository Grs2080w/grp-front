"use client"

import UseStyleBar from "@/hooks/use-style-bar"
import Breadcrumbs from "./BreadCrumbs"
import PageAccount from "./PageAccount"
import { User } from "../services/getUser"
import { Server } from "../services/getServer"

const styles = {
	title: "ml-[10px] mt-[40px] font-bold text-5xl",
}

interface Props {
	data: User
	server: Server
	timeLeftSec: number
}

export default function GatewayPage({ data, server, timeLeftSec }: Props) {
	const { isMobile, stylePage } = UseStyleBar()

	return (
		<div className={stylePage}>
			<Breadcrumbs />

			<h1 className={styles.title}>Account</h1>

			<div>
				<PageAccount data={data} server={server} isMobile={isMobile} timeLeftSec={timeLeftSec} />
			</div>
		</div>
	)
}
