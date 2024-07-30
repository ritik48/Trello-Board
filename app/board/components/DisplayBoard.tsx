"use client";

import { Column } from "./Column";
import { TaskProp } from "./Task";

export function DisplayBoard({ tasks }: { tasks: TaskProp[] }) {
    return (
        <div className="grid grid-cols-4 gap-7">
            <Column tasks={tasks} column={"todo"} />
            <Column tasks={tasks} column={"progress"} />
            <Column tasks={tasks} column={"review"} />
            <Column tasks={tasks} column={"finished"} />
        </div>
    );
}
