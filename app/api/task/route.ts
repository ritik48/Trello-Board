import { connectDb } from "@/lib/db";
import { handleAuth } from "@/server/handleAuth";
import { Task } from "@/server/models/task";
import { User } from "@/server/models/user";

export async function POST(req: Request, res: Response) {
    try {
        const userId = await handleAuth();

        const taskData = await req.json();

        await connectDb();

        const task = await Task.create({ ...taskData, user: userId });

        await User.findByIdAndUpdate(userId, {
            $push: { taskOrder: taskData.id },
        });

        return Response.json(
            { success: true, message: "Task addedd", task },
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

// update taskids order, when task position is changed on drag and drop
export async function PATCH(req: Request, res: Response) {
    try {
        const userId = await handleAuth();

        const taskData = await req.json();

        await connectDb();

        await User.findOneAndUpdate(
            { _id: userId },
            { taskOrder: taskData.taskIds }
        );

        return Response.json({ success: true }, { status: 201 });
    } catch (error: any) {
        return Response.json({
            success: false,
            message: error?.message || "Cannot process this request",
        });
    }
}
