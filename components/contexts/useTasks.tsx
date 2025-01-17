"use client";

import { ColumnType } from "@/app/board/components/Column";
import { TaskProp } from "@/app/board/components/Task";
import { Active, Over } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { useRouter } from "next/navigation";
import React, { createContext, useContext, useState } from "react";
import { boolean } from "zod";

const initialContext = {
    tasks: [],
    updateDb: async () => {},
    addTask: async () => {},
    deleteTask: async () => {},
    editTask: async () => {},
    setTasks: () => {},
    edit: false,
    handleEdit: () => {},
};

type TaskContextType = {
    tasks: TaskProp[];
    updateDb: (oldTask: TaskProp, newTask: TaskProp) => Promise<void>;
    addTask: (task: TaskProp) => Promise<void>;
    deleteTask: (taskId: string) => Promise<void>;
    editTask: (value: TaskProp) => Promise<void>;
    setTasks: React.Dispatch<React.SetStateAction<TaskProp[] | []>>;
    edit: boolean;
    handleEdit: (value: boolean) => void;
};

const TasksContext = createContext<TaskContextType>(initialContext);

const TasksProvider = ({ children }: { children: React.ReactNode }) => {
    const [tasks, setTasks] = useState<TaskProp[] | []>([]);
    const [edit, setEdit] = useState<boolean>(false);

    const router = useRouter();

    // ADD NEW TASK
    async function addTask(task: {
        title: string;
        status: ColumnType;
        description?: string;
        priority: string;
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
        router.refresh();
    }

    async function deleteTask(taskId: string) {
        if (!taskId) return;

        setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));

        const deleteRes = await fetch(`/api/task/${taskId}`, {
            method: "DELETE",
        });
        const data = await deleteRes.json();
        router.refresh();
    }
    async function editTask(value: TaskProp) {
        setTasks((prevTasks) => {
            return prevTasks.map((task) =>
                task.id !== value.id ? task : value
            );
        });

        const editRes = await fetch(`/api/task/${value.id}`, {
            method: "PUT",
            body: JSON.stringify({ data: value }),
        });
        const data = await editRes.json();
        router.refresh();
    }

    // UPDATE TASK ORDER WHEN A TASK MOVES TO NEW COLUMN, AND ALSO EDIT ITS STATUS
    async function updateDb(oldTask: TaskProp, newTask: TaskProp) {
        if (!oldTask || !newTask) return;

        const statusChange = oldTask.status !== newTask.status;

        if (statusChange) {
            const updateTask = await fetch(`/api/task/${oldTask.id}`, {
                method: "PATCH",
                body: JSON.stringify({
                    status: newTask.status,
                }),
            });
            const data = await updateTask.json();
        }

        const taskIds = tasks.map((task) => task.id);

        const updateOrder = await fetch("/api/task", {
            method: "PATCH",
            body: JSON.stringify({ taskIds }),
        });

        const data = await updateOrder.json();
        router.refresh();
    }

    function handleEdit(value: boolean) {
        setEdit(value);
    }

    return (
        <TasksContext.Provider
            value={{
                tasks,
                addTask,
                updateDb,
                deleteTask,
                editTask,
                setTasks,
                edit,
                handleEdit,
            }}
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
