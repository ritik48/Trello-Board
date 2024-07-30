import { ColumnType } from "@/app/board/components/Column";
import mongoose, { Model, ObjectId } from "mongoose";

const Schema = mongoose.Schema;

interface ITask {
    title: string;
    status: ColumnType;
    createdAt: Date;
    user: ObjectId;
}

interface TaskModel extends Model<ITask> {}

const TaskSchema = new Schema<ITask, TaskModel>({
    title: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export const Task =
    mongoose.models.Task ||
    mongoose.model<ITask, TaskModel>("Task", TaskSchema);
