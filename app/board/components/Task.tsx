"use client";

import { ColumnType } from "./Column";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export interface TaskProp {
    id: string;
    title: string;
    status: ColumnType;
}

export function Task({ id, title, status }: TaskProp) {
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
            <p>{title}</p>
        </div>
    );
}
