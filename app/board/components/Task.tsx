import { ColumnType } from "./Column";

export interface TaskProp {
    id: number;
    title: string;
    status: ColumnType;
}

export function Task({ id, title, status }: TaskProp) {
    return (
        <div className="border rounded-md p-3">
            <p>{title}</p>
        </div>
    );
}
