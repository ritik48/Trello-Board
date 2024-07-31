import { connectDb } from "@/lib/db";
import { Task } from "@/server/models/task";
import { NextRequest, NextResponse } from "next/server";

// update taskids order, when task position is changed on drag and drop
export async function PATCH(
    req: NextRequest,
    { params }: { params: { id?: string } }
) {
    try {
        const taskData = await req.json();
        const { id: taskId } = params;

        if (!taskId || !taskData.status) {
            throw new Error("Invalid payload");
        }

        await connectDb();

        const task = await Task.findOneAndUpdate(
            { id: taskId },
            { status: taskData.status }
        );

        return Response.json(
            { success: true, message: "Task updated" },
            { status: 201 }
        );
    } catch (error: any) {
        return Response.json({
            success: false,
            message: error?.message || "Cannot process this request",
        });
    }
}
