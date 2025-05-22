import { FormControl, FormDescription, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import BadgeTags, { GenerateStyleBadgeTag } from "./BadgeTags"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Dispatch, SetStateAction } from "react"

interface Tag {
	name: string
	style: string
	id: number
}

interface Props {
	tags: Tag[]
	setTags: Dispatch<SetStateAction<Tag[]>>
	tagName: string
	setTagName: Dispatch<SetStateAction<string>>
}

export default function RenderTagsInput({ tags, setTags, tagName, setTagName }: Props) {
	function DeleteTag(id: number) {
		const newTags = tags.filter((tag) => tag.id != id)
		setTags(newTags)
	}

	return (
		<FormItem>
			<FormLabel>Tags</FormLabel>
			<div>
				{tags.map((tag, index) => {
					return <BadgeTags DeleteTag={DeleteTag} key={index} tag={tag} />
				})}
			</div>
			<FormControl>
				<div className="flex gap-3">
					<Input autoComplete="false" placeholder="Set a new Tag..." value={tagName} onChange={(e) => setTagName(e.target.value)} />
					<Button
						type="button"
						onClick={(e) => {
							e.preventDefault()
							setTags(
								tags!.concat({
									name: String(tagName),
									style: GenerateStyleBadgeTag(),
									id: tags.length + 1,
								})
							)
							setTagName("")
						}}
					>
						Add Tag
					</Button>
				</div>
			</FormControl>
			<FormDescription>The File Tags. Add tags to metrics, make searchs, and make the files more stylized.</FormDescription>
			<FormMessage />
		</FormItem>
	)
}
