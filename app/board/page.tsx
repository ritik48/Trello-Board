import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { redirect } from "next/navigation";
import { getTasks } from "@/server/services/getTasks";
import { TasksProvider } from "@/components/contexts/useTasks";
import { rearrangeTasks } from "@/lib/helper";
import dynamic from "next/dynamic";

const DisplayBoard = dynamic(() => import("./components/DisplayBoard"), {
    ssr: false,
});

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
        <section className="flex-1">
            <div className="max-w-7xl mx-auto mt-10 sm:mt-16 flex flex-col gap-6">
                <h1 className="text-left text-xl font-semibold mx-3 text-secondary">
                    Your tasks
                </h1>
                <TasksProvider>
                    <DisplayBoard initialTasks={updatedTasks} />
                </TasksProvider>
            </div>
        </section>
    );
}
