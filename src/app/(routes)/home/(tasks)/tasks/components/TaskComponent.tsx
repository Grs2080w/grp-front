import { useState } from "react"
import { Task as TaskType } from "../services/getTasks"
import { Checkbox } from "@/components/ui/checkbox"

import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from "@/components/ui/context-menu"
import DeleteTasks from "../services/deleteTask"
import ChangeStatusTasks from "../services/changeStatus"

const styles = {
    taskBox: "border-1 p-3 rounded-lg m-1 font-semibold hover:bg-zinc-800 hover:cursor-pointer active:bg-zinc-900",
    taskRow: "flex gap-4 items-center",
    taskTitleClosed: "text-zinc-700",
    contextMenuContent: "bg-zinc-900 hover:cursor-pointer",
    contextMenuItem: "hover:cursor-pointer",
}

interface Props {
    tasks: TaskType[]
    task: TaskType
    setTasks: React.Dispatch<React.SetStateAction<TaskType[]>>
    index: number
    status: boolean
}

export default function TaskComponent({ tasks, task, index, status, setTasks }: Props) {
    const [checked, setChecked] = useState(status)

    return (
        <div>
            <ContextMenu>
                <ContextMenuTrigger>
                    <div
                        onClick={() => {
                            ChangeStatusTasks(task.id)
                            setChecked(!checked)
                            const newTasks: TaskType[] = tasks.map((taskOld) => {
                                if (taskOld.id === task.id) {
                                    return { ...taskOld, status: checked ? "open" : "closed" }
                                }
                                return taskOld
                            })
                            setTasks(newTasks)
                        }}
                        className={styles.taskBox}
                        key={index}
                    >
                        <div className={styles.taskRow}>
                            <Checkbox disabled={status} checked={checked} onCheckedChange={() => setChecked(!checked)} />
                            <div className={status ? styles.taskTitleClosed : ""}>{task.title}</div>
                        </div>
                    </div>
                </ContextMenuTrigger>
                <ContextMenuContent className={styles.contextMenuContent}>
                    <ContextMenuItem
                        onClick={() => {
                            setTasks(tasks.filter((taskOld) => taskOld.id !== task.id))
                            DeleteTasks(task.id)
                        }}
                        className={styles.contextMenuItem}
                        variant="destructive"
                    >
                        Delete
                    </ContextMenuItem>
                </ContextMenuContent>
            </ContextMenu>
        </div>
    )
}