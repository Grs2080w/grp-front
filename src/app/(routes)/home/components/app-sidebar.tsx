import { Armchair, ChevronDown, ChevronsUpDown, LogOut, UserCircle2Icon } from "lucide-react"
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarFooter } from "@/components/ui/sidebar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { getUserCredentials } from "../utils/get-user-credentials"

import { MenusNames, MenusLinks } from "./links-side-bar"
import ToAccount from "../utils/toaccount"
import SignOut from "../utils/signout"
import Link from "next/link"
import { Separator } from "@/components/ui/separator"

const styles = {
	sidebar: "bg-zinc-900",
	serverName: "font-bold pl-1 bg-zinc-900 p-1",
	sidebarContent: "bg-zinc-900",
	collapsible: "group/collapsible",
	collapsibleTrigger: "flex justify-between hover:cursor-pointer hover:bg-zinc-800 rounded-md p-1",
	collapsibleIcon: "ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180",
	menuItem: "hover:bg-zinc-800 active:bg-zinc-900 rounded-md",
	sidebarFooter: "bg-zinc-900 overflow-hidden",
	sidebarMenu: "hover:bg-zinc-800 rounded-md p-2",
	sidebarMenuButton: "p-0 h-12",
	username: "font-bold",
	email: "text-[8px]",
	dropdownMenuContent: "w-[200px] bg-zinc-900 m-2",
}

export async function AppSidebar() {
	const { username, email, emailMore, avatarUser } = await getUserCredentials()

	return (
		<Sidebar collapsible="offcanvas" className={styles.sidebar}>
			<div className={styles.serverName}>{process.env.NEXT_NAME_SERVER}</div>
			<SidebarContent className={styles.sidebarContent}>
				<SidebarGroupLabel>
					<SidebarGroupContent>
						<SidebarMenu>
							<SidebarMenuItem className={styles.menuItem}>
								<SidebarMenuButton asChild>
									<Link href={`/home`}>
										<Armchair />
										<span>Home</span>
									</Link>
								</SidebarMenuButton>
							</SidebarMenuItem>
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroupLabel>
				{MenusNames.map((item, index) => {
					return (
						<Collapsible defaultOpen className={styles.collapsible} key={item}>
							<SidebarGroup>
								<SidebarGroupLabel asChild />
								<CollapsibleTrigger className={styles.collapsibleTrigger}>
									<div className={styles.username}>{item}</div>
									<div>
										<ChevronDown className={styles.collapsibleIcon} />
									</div>
								</CollapsibleTrigger>
								<CollapsibleContent>
									<SidebarGroupContent>
										<SidebarMenu>
											{MenusLinks[index].map((item) => (
												<SidebarMenuItem key={item.title} className={styles.menuItem}>
													<SidebarMenuButton asChild>
														<Link href={item.url}>
															<item.icon />
															<span>{item.title}</span>
														</Link>
													</SidebarMenuButton>
												</SidebarMenuItem>
											))}
										</SidebarMenu>
									</SidebarGroupContent>
								</CollapsibleContent>
							</SidebarGroup>
						</Collapsible>
					)
				})}
			</SidebarContent>

			<SidebarFooter className={styles.sidebarFooter}>
				<SidebarMenu className={styles.sidebarMenu}>
					<SidebarMenuItem>
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<SidebarMenuButton className={styles.sidebarMenuButton}>
									<Avatar>
										<AvatarImage src={avatarUser} />
										<AvatarFallback>{username[0].toUpperCase()}</AvatarFallback>
									</Avatar>
									<div>
										<div className={styles.username}>{username}</div>
										<div className={styles.email}>{email}</div>
									</div>
									<ChevronsUpDown className="ml-auto" />
								</SidebarMenuButton>
							</DropdownMenuTrigger>
							<DropdownMenuContent side="right" className={styles.dropdownMenuContent}>
								<div className="flex gap-2 items-center justify-start p-2">
									<Avatar>
										<AvatarImage src={avatarUser} />
										<AvatarFallback>{username[0].toUpperCase()}</AvatarFallback>
									</Avatar>
									<div>
										<div className={styles.username}>{username}</div>
										<div className={styles.email}>{emailMore}</div>
									</div>
								</div>
								<Separator className="my-2" />
								<form action={ToAccount}>
									<button type="submit" className="w-full hover:cursor-pointer">
										<DropdownMenuItem className="cursor-pointer">
											<span>Account</span>
											<UserCircle2Icon className="ml-auto" />
										</DropdownMenuItem>
									</button>
								</form>

								<form action={SignOut}>
									<button type="submit" className="w-full hover:cursor-pointer">
										<DropdownMenuItem className="cursor-pointer" variant="destructive">
											<span>Sign out</span>
											<LogOut className="ml-auto" />
										</DropdownMenuItem>
									</button>
								</form>
							</DropdownMenuContent>
						</DropdownMenu>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarFooter>
		</Sidebar>
	)
}
