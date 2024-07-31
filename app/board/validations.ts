import { z } from "zod";

const taskSchema = z.object({
    title: z.string().refine(
        (value) => {
            return value.length >= 4;
        },
        { message: "Title must have at atleast 4 characters" }
    ),
    description: z.string().optional(),
    priority: z.string().optional(),
});

type TaskSchema = z.infer<typeof taskSchema>;

export { taskSchema, type TaskSchema };
