import { z } from "zod";

const taskSchema = z.object({
    title: z.string().refine(
        (value) => {
            return value.length >= 4;
        },
        { message: "Title must have at atleast 4 characters" }
    ),
});

type TaskSchema = z.infer<typeof taskSchema>;

export { taskSchema, type TaskSchema };
