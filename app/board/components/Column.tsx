"use client";

import { COLUMN_LABEL, COLUMN_LABEL_COLORS } from "@/lib/constants";
import { AddTaskDialog } from "./AddTaskDialog";
import { Task, TaskProp } from "./Task";
import { SortableContext, useSortable } from "@dnd-kit/sortable";

import { useMemo } from "react";
export type ColumnType = "todo" | "progress" | "review" | "finished";

interface ColumnProp {
    tasks: TaskProp[];
    column: ColumnType;
    id: string;
}

export function Column({ tasks, column, id }: ColumnProp) {
    const currentTasks = tasks.filter(
        (task: TaskProp) => task.status === column
    );
    const { setNodeRef } = useSortable({
        id,
        data: {
            type: "Column",
            column: { id, column },
        },
    });

    const taskIds = useMemo(() => {
        return currentTasks.map((r) => r.id);
    }, [currentTasks]);

    return (
        <div className="flex flex-col gap-4" ref={setNodeRef}>
            <div className="flex flex-col gap-3">
                <div className="flex items-center gap-10">
                    <div
                        className={`font-semibold ${COLUMN_LABEL_COLORS[column]}`}
                    >
                        {COLUMN_LABEL[column]}
                    </div>
                    <div className="text-green-400">{currentTasks.length}</div>
                </div>
                {currentTasks.length > 0 && (
                    <div className="flex flex-col gap-2 overflow-y-auto max-h-[280px]">
                        <SortableContext items={taskIds}>
                            {currentTasks.map((task: TaskProp) => (
                                <Task
                                    title={task.title}
                                    id={task.id}
                                    status={task.status}
                                    key={task.id}
                                    priority={task.priority || "none"}
                                    description={task.description || ""}
                                />
                            ))}
                        </SortableContext>
                    </div>
                )}
            </div>
            <div className="">
                <AddTaskDialog taskType={column}>
                    <button className="border text-secondary flex items-center border-zinc-500  gap-2 hover:gap-4 font-medium px-4 py-1.5 rounded-md text-sm hover:opacity-70 transition-all duration-300">
                        <span>Add</span>
                        <span>+</span>
                    </button>
                </AddTaskDialog>
            </div>
        </div>
    );
}
