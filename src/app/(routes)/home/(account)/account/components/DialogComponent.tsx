import { Button } from "@/components/ui/button"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import GetRefreshToken from "../services/getRefreshToken"

interface Props {
	dialogOpen: boolean
	setDialogOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export default function DialogComponent({ dialogOpen, setDialogOpen }: Props) {
	return (
		<Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Are you sure?</DialogTitle>
					<DialogDescription>This action is dangerous. Are you sure you want to trust this device?</DialogDescription>
				</DialogHeader>
				<DialogFooter>
					<DialogClose asChild>
						<Button variant={"outline"}>Cancel</Button>
					</DialogClose>
					<DialogClose asChild>
						<Button
							onClick={async () => {
								await GetRefreshToken()
							}}
						>
							Trust
						</Button>
					</DialogClose>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}
