import { connectDb } from "@/lib/db";
import { handleAuth } from "../handleAuth";
import { Task } from "../models/task";

export async function getTasks() {
    try {
        const userId = await handleAuth();

        await connectDb();

        const tasks = await Task.find({ user: userId });

        return { success: true, tasks };
    } catch (error: any) {
        return {
            success: false,
            message: error?.message || "Cannot process this request",
            tasks: [],
        };
    }
}
