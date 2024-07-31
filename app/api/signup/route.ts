import { connectDb } from "@/lib/db";
import { User } from "@/server/models/user";

export async function POST(req: Request, res: Response) {
    try {
        await connectDb();

        const { username, password } = await req.json();

        const userExists = await User.findOne({ username });
        if (userExists) {
            return Response.json(
                { success: false, message: "Username already exists" },
                { status: 400 }
            );
        }

        await User.create({ username, password });
        return Response.json(
            { success: true, message: "Account created" },
            { status: 201 }
        );
    } catch (error) {
        console.log(error);
    }
}
