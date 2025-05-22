import { Badge } from "@/components/ui/badge"
import { X } from "lucide-react"

export function GenerateStyleBadgeTag() {
	const ramdom = Math.ceil(Math.random() * 84)
	const bgColors = [
		"bg-slate-200",
		"bg-slate-300",
		"bg-slate-400",
		"bg-slate-500",
		"bg-gray-200",
		"bg-gray-300",
		"bg-gray-400",
		"bg-gray-500",
		"bg-zinc-200",
		"bg-zinc-300",
		"bg-zinc-400",
		"bg-zinc-500",
		"bg-neutral-200",
		"bg-neutral-300",
		"bg-neutral-400",
		"bg-neutral-500",
		"bg-stone-200",
		"bg-stone-300",
		"bg-stone-400",
		"bg-stone-500",

		"bg-red-200",
		"bg-red-300",
		"bg-red-400",
		"bg-red-500",
		"bg-orange-200",
		"bg-orange-300",
		"bg-orange-400",
		"bg-orange-500",
		"bg-amber-200",
		"bg-amber-300",
		"bg-amber-400",
		"bg-amber-500",
		"bg-yellow-200",
		"bg-yellow-300",
		"bg-yellow-400",
		"bg-yellow-500",
		"bg-lime-200",
		"bg-lime-300",
		"bg-lime-400",
		"bg-lime-500",

		"bg-green-200",
		"bg-green-300",
		"bg-green-400",
		"bg-green-500",
		"bg-emerald-200",
		"bg-emerald-300",
		"bg-emerald-400",
		"bg-emerald-500",
		"bg-teal-200",
		"bg-teal-300",
		"bg-teal-400",
		"bg-teal-500",
		"bg-cyan-200",
		"bg-cyan-300",
		"bg-cyan-400",
		"bg-cyan-500",
		"bg-sky-200",
		"bg-sky-300",
		"bg-sky-400",
		"bg-sky-500",

		"bg-blue-200",
		"bg-blue-300",
		"bg-blue-400",
		"bg-blue-500",
		"bg-indigo-200",
		"bg-indigo-300",
		"bg-indigo-400",
		"bg-indigo-500",
		"bg-violet-200",
		"bg-violet-300",
		"bg-violet-400",
		"bg-violet-500",
		"bg-purple-200",
		"bg-purple-300",
		"bg-purple-400",
		"bg-purple-500",

		"bg-fuchsia-200",
		"bg-fuchsia-300",
		"bg-fuchsia-400",
		"bg-fuchsia-500",
		"bg-pink-200",
		"bg-pink-300",
		"bg-pink-400",
		"bg-pink-500",
		"bg-rose-200",
		"bg-rose-300",
		"bg-rose-400",
		"bg-rose-500",
	]

	return bgColors[ramdom] + " m-0.5"
}

interface Tag {
	name: string
	style: string
	id: number
}

const styles = {
    deleteButton: "hover:bg-red-400 hover:cursor-pointer rounded-sm p-0.5 active:bg-red-600",
}

export default function BadgeTags({ tag, DeleteTag, putButton = true }: { tag: Tag; DeleteTag?(id: number): void; putButton?: boolean }) {
    return (
        <Badge className={tag.style}>
            {tag.name}
            {putButton && (
                <button
                    onClick={() => DeleteTag && DeleteTag(tag.id)}
                    className={styles.deleteButton}
                    type="button"
                >
                    <X size={15} />
                </button>
            )}
        </Badge>
    )
}
