"use client";

import { Task, TaskProp } from "./Task";


export type ColumnType = "todo" | "progress" | "review" | "finished";

interface ColumnProp {
    tasks: TaskProp[];
    column: ColumnType;
}

export function Column({ tasks, column }: ColumnProp) {
    const currentTasks = tasks.filter((task) => task.status === column);
    return (
        <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                    <div className="font-semibold">{column}</div>
                    <div>{currentTasks.length}</div>
                </div>
                <div className="flex flex-col gap-2">
                    {currentTasks.map((task) => (
                        <Task
                            title={task.title}
                            id={task.id}
                            status={task.status}
                            key={task.id}
                        />
                    ))}
                </div>
            </div>
            <div className="">
                <button className="border px-4 py-1.5 rounded-md text-sm bg-primary text-secondary hover:opacity-70 transition-all duration-300">
                    Add +
                </button>
            </div>
        </div>
    );
}
