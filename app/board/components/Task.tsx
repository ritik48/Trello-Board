import { ColumnType } from "./Column";

export interface TaskProp {
    _id: string;
    title: string;
    status: ColumnType;
}

export function Task({ _id, title, status }: TaskProp) {
    return (
        <div className="border rounded-md p-3">
            <p>{title}</p>
        </div>
    );
}
