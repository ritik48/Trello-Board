import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";

export async function handleAuth() {
    const session = await getServerSession(authOptions);

    if (!session?.user.username) {
        throw new Error("You are not authenticated");
    }
    return session.user._id;
}
