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
    const { attributes, listeners, setNodeRef, transform, transition } =
        useSortable({ id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <div
            className="border rounded-md p-3 bg-zinc-800 text-secondary"
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
        >
            <p>{title}</p>
        </div>
    );
}
