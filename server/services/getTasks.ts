import { connectDb } from "@/lib/db";
import { handleAuth } from "../handleAuth";
import { Task } from "../models/task";
import { User } from "../models/user";

export async function getTasks() {
    try {
        const userId = await handleAuth();

        await connectDb();

        const tasks = await Task.find({ user: userId });
        const user = await User.findById(userId);

        return {
            success: true,
            tasks: JSON.parse(JSON.stringify(tasks)),
            taskOrder: user.taskOrder,
        };
    } catch (error: any) {
        return {
            success: false,
            message: error?.message || "Cannot process this request",
            tasks: [],
        };
    }
}
