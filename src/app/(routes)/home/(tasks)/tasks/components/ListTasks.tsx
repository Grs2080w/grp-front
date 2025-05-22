import { Task } from "../services/getTasks"
import TaskComponent from "./TaskComponent"

const styles = {
    wrapper: "flex justify-around w-[75vw] flex-wrap",
    columnsWrapper: "flex justify-around w-full flex-wrap",
    column: "mt-6 min-w-[300px]",
    columnTitle: "text-2xl font-bold ml-3 mb-3",
    noTasks: "text-2xl font-bold ml-3 mb-3 text-zinc-700",
}

interface Props {
    tasks: Task[]
    setTasks: React.Dispatch<React.SetStateAction<Task[]>>
}

export default function ListTaks({ tasks, setTasks }: Props) {
    return (
        <div className={styles.wrapper}>
            {tasks.length > 0 && (
                <div className={styles.columnsWrapper}>
                    <div className={styles.column}>
                        <h4 className={styles.columnTitle}>Open</h4>
                        {tasks.map((task, index) => {
                            if (task.status === "open") {
                                return <TaskComponent key={index} tasks={tasks} status={false} task={task} setTasks={setTasks} index={index} />
                            }
                        })}
                    </div>
                    <div className={styles.column}>
                        <h4 className={styles.columnTitle}>Closed</h4>
                        {tasks.map((task, index) => {
                            if (task.status === "closed") {
                                return <TaskComponent key={index} tasks={tasks} status={true} setTasks={setTasks} task={task} index={index} />
                            }
                        })}
                    </div>
                </div>
            )}
            {tasks.length === 0 && <h1 className={styles.noTasks}>No tasks</h1>}
        </div>
    )
}