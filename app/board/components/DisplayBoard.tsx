"use client";

import { useEffect, useMemo, useState } from "react";
import { Column, ColumnType } from "./Column";
import { Task, TaskProp } from "./Task";

import {
    DndContext,
    DragEndEvent,
    DragOverEvent,
    PointerSensor,
    useSensor,
    useSensors,
    DragOverlay,
    DragStartEvent,
} from "@dnd-kit/core";
import { arrayMove, SortableContext } from "@dnd-kit/sortable";
import { useTasks } from "@/components/contexts/useTasks";
import { createPortal } from "react-dom";

const cols: { id: string; column: ColumnType }[] = [
    { id: "t", column: "todo" },
    { id: "p", column: "progress" },
    { id: "r", column: "review" },
    { id: "f", column: "finished" },
];

export default function DisplayBoard({
    initialTasks,
}: {
    initialTasks: TaskProp[];
}) {
    const { setTasks, updateDb, tasks } = useTasks();

    const [activeTask, setActiveTask] = useState<TaskProp | null>(null);
    const [updatedTask, setUpdatedTask] = useState<TaskProp | null>(null);

    async function handleDragEnd(event: DragEndEvent) {
        if (!activeTask || !updatedTask) return;

        await updateDb(activeTask, updatedTask);
        setActiveTask(null);
        setUpdatedTask(null);
    }
    function handleDragOver(event: DragOverEvent) {
        const { active, over } = event;

        if (!over) return;
        if (active.id === over.id) return;

        if (
            active.data.current?.type === "Task" &&
            over.data.current?.type === "Task"
        ) {
            const copy = [...tasks];
            const oldIndex = copy.findIndex((t) => t.id === active.id);
            const newIndex = copy.findIndex((t) => t.id === over?.id);

            copy[oldIndex].status = copy[newIndex].status;

            const t = arrayMove(copy, oldIndex, newIndex);

            setTasks(t);
            setUpdatedTask(copy[oldIndex]);
            return;
        }

        if (
            active.data.current?.type === "Task" &&
            over.data.current?.type === "Column"
        ) {
            if (
                active.data.current?.task.status ===
                over.data.current?.column.column
            )
                return;

            const oldIndex = tasks.findIndex((t) => t.id === active.id);
            const copy = [...tasks];
            copy[oldIndex].status = over.data.current?.column.column;

            setTasks(copy);
            setUpdatedTask(copy[oldIndex]);
        }
    }
    function onDragStart(event: DragStartEvent) {
        if (event.active.data.current?.type === "Task") {
            setActiveTask(event.active.data.current?.task);
            return;
        }
    }

    useEffect(() => {
        setTasks(initialTasks);
    }, [initialTasks, setTasks]);

    const columnIds = useMemo(() => {
        return cols.map((c) => c.id);
    }, []);

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: { distance: 10 },
        })
    );

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 px-3 mx-2">
            <DndContext
                sensors={sensors}
                onDragOver={handleDragOver}
                onDragEnd={handleDragEnd}
                onDragStart={onDragStart}
            >
                <SortableContext items={columnIds}>
                    {cols.map((c) => (
                        <Column
                            tasks={tasks}
                            column={c.column}
                            key={c.id}
                            id={c.id}
                        />
                    ))}
                </SortableContext>
                {createPortal(
                    <DragOverlay>
                        {activeTask && (
                            <Task
                                id={activeTask.id}
                                status={activeTask.status}
                                title={activeTask.title}
                            />
                        )}
                    </DragOverlay>,
                    document.body
                )}
            </DndContext>
        </div>
    );
}
