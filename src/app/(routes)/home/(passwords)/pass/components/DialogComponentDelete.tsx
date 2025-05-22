import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import DeletePass from "../services/deletePass"

const styles = {
    title: "text-2xl w-full flex",
    description: "text-md wrap-anywhere w-[75%]",
    buttonRow: "flex gap-2 justify-end",
    cancelButton: "hover:cursor-pointer",
    deleteButton: "hover:cursor-pointer bg-red-500 hover:bg-red-400 active:bg-red-600 text-white",
}

interface Props {
    dialogOpen: boolean
    setDialogOpen: React.Dispatch<React.SetStateAction<boolean>>
    passToSee: string
}

export default function DialogComponentDelete({ dialogOpen, setDialogOpen, passToSee }: Props) {
    return (
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className={styles.title}>Delete</DialogTitle>
                </DialogHeader>
                <DialogDescription className={styles.description}>
                    Are you sure you want to delete this password?
                </DialogDescription>
                <div className={styles.buttonRow}>
                    <Button className={styles.cancelButton} onClick={() => setDialogOpen(false)}>
                        Cancel
                    </Button>
                    <Button
                        className={styles.deleteButton}
                        onClick={async () => {
                            setDialogOpen(false)
                            await DeletePass(passToSee)
                        }}
                    >
                        Delete
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}