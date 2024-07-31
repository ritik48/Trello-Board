import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import {
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import React, { useState } from "react";
import { ColumnType } from "./Column";
import { AddTaskForm } from "./AddTaskForm";
import { TaskProp } from "./Task";

interface AddTaskDialogProp {
    children: React.ReactNode;
    taskType: ColumnType;
    editConfig?: {
        task: TaskProp;
    };
}

export function AddTaskDialog({
    children,
    taskType,
    editConfig,
}: AddTaskDialogProp) {
    const [open, setOpen] = useState<boolean>(false);

    function handleClose() {
        setOpen(false);
    }
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="sm:max-w-[425px] w-[95%]">
                <DialogHeader>
                    <DialogTitle>
                        {editConfig ? (
                            <span>Edit task</span>
                        ) : (
                            <>
                                <span>Add to </span>
                                <span className="bg-primary text-secondary px-2 py-1 font-light rounded-md">
                                    {taskType}
                                </span>
                            </>
                        )}
                    </DialogTitle>
                    <DialogDescription></DialogDescription>
                </DialogHeader>
                <AddTaskForm onClose={handleClose} editConfig={editConfig} taskType={taskType} />
            </DialogContent>
        </Dialog>
    );
}
