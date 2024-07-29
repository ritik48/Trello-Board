import { Column } from "./components/Column";
import { TaskProp } from "./components/Task";

const tasks: TaskProp[] = [
    { id: 1, title: "Research market trends", status: "todo" },
    { id: 2, title: "Write project proposal", status: "todo" },
    { id: 3, title: "Plan team meeting", status: "todo" },

    { id: 4, title: "Develop website", status: "progress" },
    { id: 5, title: "Create marketing strategy", status: "progress" },

    { id: 6, title: "Review codebase", status: "review" },
    { id: 7, title: "Test new features", status: "review" },
    { id: 8, title: "Analyze user feedback", status: "review" },
    { id: 9, title: "Proofread documents", status: "review" },

    { id: 10, title: "Launch product", status: "finished" },
    { id: 11, title: "Prepare presentation", status: "finished" },
    { id: 12, title: "Conduct training session", status: "finished" },
    { id: 13, title: "Finalize budget", status: "finished" },
    { id: 14, title: "Complete survey analysis", status: "finished" },
];

export default function Board() {
    return (
        <section className="flex-1 ">
            <div className="max-w-7xl mx-auto mt-16 flex flex-col gap-3">
                <h1 className="text-left text-xl font-semibold">Your tasks</h1>
                <div className="grid grid-cols-4 gap-7">
                    <Column tasks={tasks} column={"todo"} />
                    <Column tasks={tasks} column={"progress"} />
                    <Column tasks={tasks} column={"review"} />
                    <Column tasks={tasks} column={"finished"} />
                </div>
            </div>
        </section>
    );
}
