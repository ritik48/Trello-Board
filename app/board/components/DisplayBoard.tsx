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

export function DisplayBoard({ initialTasks }: { initialTasks: TaskProp[] }) {
    const { setTasks, changeOrder, tasks } = useTasks();

    const [activeTask, setActiveTask] = useState<TaskProp | null>(null);

    async function handleDragEnd(event: DragEndEvent) {
        // const { active, over } = event;
        // console.log("inside odrag end");
        // if (!over) return;
        // if (active.id === over.id) return;
        // await changeOrder(active, over);
    }
    function handleDragOver(event: DragOverEvent) {
        const { active, over } = event;

        if (!over) return;
        if (active.id === over.id) return;
        
        if (
            active.data.current?.type === "Task" &&
            over.data.current?.type === "Task"
        ) {
            setTasks((prevTasks) => {
                const oldIndex = prevTasks.findIndex((t) => t.id === active.id);
                const newIndex = prevTasks.findIndex((t) => t.id === over?.id);

                prevTasks[oldIndex].status = prevTasks[newIndex].status;

                return arrayMove(prevTasks, oldIndex, newIndex);
            });
            return;
        }

        if (
            active.data.current?.type === "Task" &&
            over.data.current?.type === "Column"
        ) {
            setTasks((prevTasks) => {
                const copy = [...prevTasks];
                const oldIndex = prevTasks.findIndex((t) => t.id === active.id);

                copy[oldIndex].status = over.data.current?.column.column;

                return copy;
            });
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
    }, [cols]);

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
