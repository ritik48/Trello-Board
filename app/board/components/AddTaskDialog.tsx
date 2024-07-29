import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogTrigger,
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

    function handleOpen() {
        setOpen(true);
    }
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <AddTaskForm handleOpen={handleOpen} taskType={taskType} />
            </DialogContent>
        </Dialog>
    );
}
