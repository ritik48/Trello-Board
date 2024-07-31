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
import { useTasks } from "@/components/contexts/useTasks";

import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import { uuid } from "uuidv4";
import { TaskProp } from "./Task";

const options = [
    {
        value: "none",
        label: "None",
    },
    {
        value: "low",
        label: "Low",
    },
    {
        value: "medium",
        label: "Medium",
    },
    {
        value: "urgent",
        label: "Urgent",
    },
];

interface AddTaskFormProp {
    onClose: () => void;
    taskType: ColumnType;
    editConfig?: {
        task: TaskProp;
    };
}

export function AddTaskForm({
    onClose,
    taskType,
    editConfig,
}: AddTaskFormProp) {
    const form = useForm<TaskSchema>({
        resolver: zodResolver(taskSchema),
        defaultValues: {
            priority: editConfig ? editConfig.task.priority || "none" : "none",
            title: editConfig ? editConfig.task.title : "",
            description: editConfig ? editConfig.task.description : "",
        },
    });

    const { addTask, editTask } = useTasks();

    async function handleSubmit(value: TaskSchema) {
        const taskValue = {
            ...value,
            status: taskType,
            priority: value.priority ?? "none",
        };
        if (editConfig) {
            await editTask({ ...taskValue, id: editConfig.task.id });
        } else {
            await addTask({ ...taskValue, id: uuid() });
        }
        onClose();
    }

    const isSubmitting = form.formState.isSubmitting;

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)}>
                <div>
                    <div className="flex flex-col gap-2">
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
                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-primary">
                                        Description
                                    </FormLabel>
                                    <FormControl>
                                        <Textarea
                                            {...field}
                                            placeholder="Add Description"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="priority"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Select
                                            {...field}
                                            onValueChange={(value) => {
                                                field.onChange(value);
                                            }}
                                        >
                                            <SelectTrigger className="w-[180px]">
                                                <SelectValue placeholder="Select priority" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {options.map((option) => (
                                                    <SelectItem
                                                        key={option.value}
                                                        value={option.value.toString()}
                                                    >
                                                        {option.label}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage className="text-red-500 dark:text-red-400 text-xs" />
                                </FormItem>
                            )}
                        />
                    </div>
                </div>
                <Button type="submit" className="mt-2" disabled={isSubmitting}>
                    {isSubmitting
                        ? editConfig
                            ? "Editing..."
                            : "Saving..."
                        : editConfig
                        ? "Edit"
                        : "Save"}
                </Button>
            </form>
        </Form>
    );
}
