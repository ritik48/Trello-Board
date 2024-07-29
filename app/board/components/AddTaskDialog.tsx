import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import {
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import React, { useState } from "react";
import { ColumnType } from "./Column";
import { AddTaskForm } from "./AddTaskForm";

interface AddTaskDialogProp {
    children: React.ReactNode;
    taskType: ColumnType;
}

export function AddTaskDialog({ children, taskType }: AddTaskDialogProp) {
    const [open, setOpen] = useState<boolean>(false);

    function handleClose() {
        setOpen(false);
    }
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Add new {taskType}</DialogTitle>
                    <DialogDescription></DialogDescription>
                </DialogHeader>
                <AddTaskForm onClose={handleClose} taskType={taskType} />
            </DialogContent>
        </Dialog>
    );
}
