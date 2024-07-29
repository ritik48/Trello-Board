import { Button } from "@/components/ui/button";
import {
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";
import { ColumnType } from "./Column";

interface AddTaskFormProp {
    handleOpen: () => void;
    taskType: ColumnType;
}

export function AddTaskForm({ handleOpen, taskType }: AddTaskFormProp) {
    return (
        <>
            <DialogHeader>
                <DialogTitle>Add new {taskType}</DialogTitle>
                <DialogDescription></DialogDescription>
            </DialogHeader>
            <div className="grid gap-4">
                <div className="grid grid-cols-1 items-center gap-4">
                    <Label htmlFor="titile" className="text-left">
                        Title
                    </Label>
                    <Input
                        id="title"
                        value="Pedro Duarte"
                        className="col-span-3"
                    />
                </div>
            </div>
            <DialogFooter>
                <Button
                    type="submit"
                    onClick={handleOpen}
                    className="text-left mr-auto"
                >
                    Save
                </Button>
            </DialogFooter>
        </>
    );
}
