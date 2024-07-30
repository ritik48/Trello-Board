import { taskSchema } from "@/app/board/validations";
import { connectDb } from "@/lib/db";
import { handleAuth } from "@/server/handleAuth";
import { Task } from "@/server/models/task";

export async function POST(req: Request, res: Response) {
    try {
        const userId = await handleAuth();

        const taskData = await req.json();

        await connectDb();

        const task = await Task.create({ ...taskData, user: userId });
        console.log("task = ", task);
        return Response.json(
            { success: true, message: "Task addedd" },
            { status: 201 }
        );
    } catch (error: any) {
        return Response.json({
            success: false,
            message: error?.message || "Cannot process this request",
        });
    }
}

export async function GET(req: Request, res: Response) {
    try {
        const userId = await handleAuth();

        await connectDb();

        const tasks = await Task.find({ user: userId });

        return Response.json({ success: true, tasks }, { status: 200 });
    } catch (error: any) {
        return Response.json({
            success: false,
            message: error?.message || "Cannot process this request",
        });
    }
}
