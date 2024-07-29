import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { Logout } from "./Logout";

export async function Navbar() {
    const session = await getServerSession(authOptions);
    console.log(session);
    const isAuthenticated = !!session?.user?.username;
    return (
        <nav className="h-[50px] content-center">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center px-2">
                    <div className="flex items-center gap-16">
                        <span className="text-xl font-bold">Trello B.</span>
                        <Link
                            href={"/board"}
                            className="text-sm text-muted-foreground"
                        >
                            Tasks
                        </Link>
                    </div>
                    <div className="flex items-center gap-4">
                        {!isAuthenticated ? (
                            <>
                                <Link
                                    href={"/"}
                                    className="border px-4 py-1.5 rounded-md text-sm bg-primary text-secondary hover:opacity-70 transition-all duration-300"
                                >
                                    Login
                                </Link>
                                <Link
                                    href={"/"}
                                    className="border px-4 py-1.5 rounded-md text-sm hover:bg-accent transition-all duration-300"
                                >
                                    Signup
                                </Link>
                            </>
                        ) : (
                            <>
                                <div className="flex items-center gap-2 border rounded-full px-4 py-0.5">
                                    <p className="w-fit">
                                        {session?.user.username}
                                    </p>

                                    <span className="w-2 inline-block h-2 bg-green-600 rounded-full"></span>
                                </div>
                                <Logout />
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}
