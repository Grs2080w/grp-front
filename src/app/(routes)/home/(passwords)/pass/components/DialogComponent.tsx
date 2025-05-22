import { Pass } from "../services/getPass"
import BadgeTags from "./BadgeTags"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

const styles = {
	title: "text-2xl w-full flex",
	description: "text-md wrap-anywhere w-[75%]",
	row: "font-bold flex gap-2 m-1",
	rowTag: "font-bold flex gap-1 m-1",
	value: "font-normal",
	valueSmall: "font-normal text-sm wrap-anywhere w-[80%]",
	valueWrap: "font-normal wrap-anywhere",
	tag: "bg-white text-black",
}

interface Props {
	dialogOpen: boolean
	setDialogOpen: React.Dispatch<React.SetStateAction<boolean>>
	passToSee: Pass
}

export default function DialogComponent({ dialogOpen, setDialogOpen, passToSee }: Props) {
	return (
		<Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle className={styles.title}>Details</DialogTitle>
				</DialogHeader>
				<DialogDescription className={styles.description}>Here you will find some information about this password</DialogDescription>
				<div>
					<div className={styles.row}>
						Identifier: <p className={styles.value}>{passToSee.Identifier}</p>
					</div>
					<div className={styles.row}>
						Hash: <p className={styles.valueSmall}>{passToSee.Hash}</p>
					</div>
					<div className={styles.row}>
						Size: <p className={styles.value}>{passToSee.Size}</p>
					</div>
					<div className={styles.row}>
						ID: <p className={styles.valueWrap}>{passToSee.Id}</p>
					</div>

					<div className={styles.rowTag}>
						Tags:
						{passToSee.Tags.length !== 0 ? (
							passToSee.Tags.map((tag, index) => (
								<span key={index}>
									<BadgeTags
										tag={{
											name: tag,
											style: styles.tag,
											id: index,
										}}
										putButton={false}
									/>
								</span>
							))
						) : (
							<div>No tags</div>
						)}
					</div>
				</div>
			</DialogContent>
		</Dialog>
	)
}
