"use client";

import { ColumnType } from "@/app/board/components/Column";
import { TaskProp } from "@/app/board/components/Task";
import { Active, Over } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import React, { createContext, useContext, useState } from "react";

const initialContext = {
    tasks: [],
    changeOrder: async () => {},
    addTask: async () => {},
    setTasks: () => {},
};

type TaskContextType = {
    tasks: TaskProp[];
    changeOrder: (oldTask: Active, newTask: Over | null) => Promise<void>;
    addTask: (task: TaskProp) => Promise<void>;
    setTasks: React.Dispatch<React.SetStateAction<TaskProp[] | []>>;
};

const TasksContext = createContext<TaskContextType>(initialContext);

const TasksProvider = ({ children }: { children: React.ReactNode }) => {
    const [tasks, setTasks] = useState<TaskProp[] | []>([]);

    async function addTask(task: {
        title: string;
        status: ColumnType;
        id: string;
    }) {
        const res = await fetch("/api/task", {
            method: "POST",
            body: JSON.stringify(task),
        });
        const data = await res.json();

        if (!data.success) {
            console.log(data.message);
            return;
        }
        setTasks((prev) => [...prev, data.task]);
    }

    async function changeOrder(oldTask: Active, newTask: Over | null) {
        const oldIndex = tasks.findIndex((t) => t.id === oldTask.id);
        const newIndex = tasks.findIndex((t) => t.id === newTask?.id);

        const updatedTasks = arrayMove(tasks, oldIndex, newIndex);
        setTasks(updatedTasks);

        // update the task order in the users db
        const taskIds = updatedTasks.map((ut) => ut.id);
        const res = await fetch("/api/task", {
            method: "PATCH",
            body: JSON.stringify({ taskIds }),
        });
    }

    return (
        <TasksContext.Provider
            value={{ tasks, addTask, changeOrder, setTasks }}
        >
            {children}
        </TasksContext.Provider>
    );
};

const useTasks = () => {
    const context = useContext(TasksContext);
    if (context === undefined) {
        throw new Error("Provider was used outside of its context");
    }
    return context;
};

export { useTasks, TasksProvider };
