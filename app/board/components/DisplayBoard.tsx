"use client";

import { useEffect, useMemo } from "react";
import { Column } from "./Column";
import { TaskProp } from "./Task";

import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { useTasks } from "@/components/contexts/useTasks";

export function DisplayBoard({ initialTasks }: { initialTasks: TaskProp[] }) {
    const { setTasks, changeOrder, tasks } = useTasks();

    function handleDragEnd(event: DragEndEvent) {
        const { active, over } = event;

        if (active.id !== over?.id) {
            changeOrder(active, over);
        }
    }

    useEffect(() => {
        setTasks(initialTasks);
    }, [initialTasks, setTasks]);

    return (
        <div className="grid grid-cols-4 gap-7">
            <DndContext onDragEnd={handleDragEnd}>
                <Column tasks={tasks} column={"todo"} />
                <Column tasks={tasks} column={"progress"} />
                <Column tasks={tasks} column={"review"} />
                <Column tasks={tasks} column={"finished"} />
            </DndContext>
        </div>
    );
}
