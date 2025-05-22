import { Book, BookUp, ChartColumnStacked, ClipboardList, Folder, FolderUp, KeyRound, MessageSquare, Pen, RotateCcwKey } from "lucide-react"

export const MenusNames = ["Files", "Ebooks", "Tasks", "Chat", "Passwords", "Metrics", "Editor"]
export const MenusLinks = [
	[
		{
			title: "Files",
			url: "/home/files",
			icon: Folder,
		},
		{
			title: "Add File",
			url: "/home/files/add",
			icon: FolderUp,
		},
	],
	[
		{
			title: "Ebooks",
			url: "/home/ebooks",
			icon: Book,
		},
		{
			title: "Add Ebook",
			url: "/home/ebooks/add",
			icon: BookUp,
		},
	],
	[
		{
			title: "Tasks",
			url: "/home/tasks",
			icon: ClipboardList,
		},
	],
	[
		{
			title: "Messages",
			url: "/home/chat",
			icon: MessageSquare,
		},
	],
	[
		{
			title: "Passwords",
			url: "/home/pass",
			icon: KeyRound,
		},
		{
			title: "Add Password",
			url: "/home/pass/add",
			icon: RotateCcwKey,
		},
	],
	[
		{
			title: "Metrics Charts",
			url: "/home/metrics",
			icon: ChartColumnStacked,
		},
	],
	[
		{
			title: "Write",
			url: "/home/editor",
			icon: Pen,
		},
	],
]
