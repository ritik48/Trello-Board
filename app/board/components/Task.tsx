"use client";

import { useTasks } from "@/components/contexts/useTasks";
import { ColumnType } from "./Column";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import { RxCross1 } from "react-icons/rx";
import { MdOutlineModeEditOutline } from "react-icons/md";
import { AddTaskDialog } from "./AddTaskDialog";
import { PRIORITY_COLORS } from "@/lib/constants";

export interface TaskProp {
    id: string;
    title: string;
    status: ColumnType;
    description?: string;
    priority: "low" | "medium" | "urgent" | "none";
}

export function Task({ id, title, status, priority, description }: TaskProp) {
    const { deleteTask } = useTasks();

    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({
        id,
        data: {
            type: "Task",
            task: { id, title, status },
        },
    });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    if (isDragging) {
        return (
            <div
                className="border rounded-md opacity-70 p-3 bg-zinc-500 text-zinc-100"
                ref={setNodeRef}
                style={style}
            >
                <p>{title}</p>
            </div>
        );
    }

    return (
        <div
            className="border border-zinc-500 rounded-md p-3 bg-zinc-800 text-secondary"
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
        >
            <div className="flex items-center justify-between">
                <p>{title}</p>
                {
                    <div className="flex items-center gap-2">
                        {priority !== "none" && (
                            <span
                                className={`text-sm px-2 rounded-md py-0.5 ${PRIORITY_COLORS[priority]}`}
                            >
                                {priority}
                            </span>
                        )}
                        <AddTaskDialog
                            taskType={status}
                            editConfig={{
                                task: {
                                    id,
                                    title,
                                    status,
                                    priority,
                                    description,
                                },
                            }}
                        >
                            <MdOutlineModeEditOutline
                                size={15}
                                className="text-zinc-400 hover:text-zinc-100 hover:scale-125 transition-all duration-200"
                            />
                        </AddTaskDialog>

                        <RxCross1
                            size={15}
                            className="text-zinc-400 hover:text-zinc-100 hover:scale-125 transition-all duration-200"
                            onClick={async () => await deleteTask(id)}
                        />
                    </div>
                }
            </div>
        </div>
    );
}
