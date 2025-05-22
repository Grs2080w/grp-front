import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"
import DeleteEbook from "../services/deleteEbooks"
import { Ebook } from "../services/getEbooks"

interface Props {
	dialogOpen: boolean
	setDialogOpen: React.Dispatch<React.SetStateAction<boolean>>
	ebook: Ebook
}

export default function AlertDialogEbook({ dialogOpen, setDialogOpen, ebook }: Props) {
	return (
		<AlertDialog open={dialogOpen} onOpenChange={setDialogOpen}>
			<AlertDialogContent className="bg-zinc-900">
				<AlertDialogHeader>
					<AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
					<AlertDialogDescription>This action cannot be undone. This will permanently delete your ebook from server.</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>Cancel</AlertDialogCancel>
					<AlertDialogAction onClick={() => {DeleteEbook(ebook.Id)}}>Continue</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	)
}
