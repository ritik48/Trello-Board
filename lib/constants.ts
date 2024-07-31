const MONGO_URL = process.env.MONGO_URL || "mongodb://localhost:27017/trello";
const NEXT_AUTH_SECRET = process.env.NEXT_AUTH_SECRET || "JEWFN934U504499349";

const COLUMN_LABEL = {
    todo: "To-Do",
    progress: "In Progress",
    review: "Under Review",
    finished: "Completed",
};

const COLUMN_LABEL_COLORS = {
    todo: "text-red-400",
    progress: "text-yellow-200",
    review: "text-blue-200",
    finished: "text-green-400",
};

const PRIORITY_COLORS = {
    low: "bg-green-500",
    medium: "bg-yellow-500",
    urgent: "bg-red-500",
};

export {
    MONGO_URL,
    NEXT_AUTH_SECRET,
    COLUMN_LABEL,
    COLUMN_LABEL_COLORS,
    PRIORITY_COLORS,
};
