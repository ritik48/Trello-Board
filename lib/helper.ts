import { TaskProp } from "@/app/board/components/Task";

export function rearrangeTasks(tasks: TaskProp[], taskIds: string[]) {
    const idToIndexMap = new Map(taskIds.map((id, index) => [id, index]));

    return tasks.sort((a, b) => {
        const indexA = idToIndexMap.get(a.id);
        const indexB = idToIndexMap.get(b.id);

        if (indexA === undefined) return 1;
        if (indexB === undefined) return -1;

        return indexA - indexB;
    });
}
