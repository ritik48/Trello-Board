import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";
import { ColumnType } from "./Column";
import { useForm } from "react-hook-form";
import { taskSchema, TaskSchema } from "../validations";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";

interface AddTaskFormProp {
    onClose: () => void;
    taskType: ColumnType;
}

export function AddTaskForm({ onClose, taskType }: AddTaskFormProp) {
    const form = useForm<TaskSchema>({
        resolver: zodResolver(taskSchema),
    });

    function handleSubmit(value: TaskSchema) {
        console.log("value = ", value);
        onClose();
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)}>
                <div>
                    <div>
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-primary">
                                        Titile
                                    </FormLabel>
                                    <FormControl>
                                        <Input {...field} placeholder="Title" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                </div>
                <Button type="submit" className="mt-2">
                    Save
                </Button>
            </form>
        </Form>
    );
}
