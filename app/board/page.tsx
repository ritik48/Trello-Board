import { getServerSession } from "next-auth";
import { DisplayBoard } from "./components/DisplayBoard";
import { authOptions } from "@/lib/authOptions";
import { redirect } from "next/navigation";
import { getTasks } from "@/server/services/getTasks";
import { TasksProvider } from "@/components/contexts/useTasks";
import { rearrangeTasks } from "@/lib/helper";

export default async function Board() {
    const session = await getServerSession(authOptions);

    if (!session?.user.username) {
        redirect("/");
    }
    const data = await getTasks();

    if (!data.success) {
        redirect("/");
    }
    const { tasks, taskOrder } = data;
    const updatedTasks = rearrangeTasks(tasks, taskOrder);

    return (
        <section className="flex-1 ">
            <div className="max-w-7xl mx-auto mt-16 flex flex-col gap-3">
                <h1 className="text-left text-xl font-semibold">Your tasks</h1>
                <TasksProvider>
                    <DisplayBoard initialTasks={updatedTasks} />
                </TasksProvider>
            </div>
        </section>
    );
}
