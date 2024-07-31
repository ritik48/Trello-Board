import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { Logout } from "./Logout";
import { HamMenu } from "./HamMenu";

export async function Navbar() {
    const session = await getServerSession(authOptions);
    const isAuthenticated = !!session?.user?.username;
    return (
        <nav className="h-[50px] content-center py-2">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center px-2">
                    <div className="flex items-center gap-16">
                        <Link
                            href={"/"}
                            className="text-xl font-bold text-secondary"
                        >
                            Trello B.
                        </Link>
                        {isAuthenticated && (
                            <Link
                                href={"/board"}
                                className="text-sm text-zinc-400 hover:underline hidden sm:block"
                            >
                                Tasks
                            </Link>
                        )}
                    </div>
                    <div className="sm:flex items-center gap-4 hidden">
                        {!isAuthenticated ? (
                            <>
                                <Link
                                    href={"/signin"}
                                    className="border px-4 py-1.5 rounded-md text-sm bg-secondary text-primary hover:opacity-70 transition-all duration-300"
                                >
                                    Login
                                </Link>
                                <Link
                                    href={"/signup"}
                                    className="border px-4 py-1.5 rounded-md text-sm text-secondary hover:bg-zinc-800 transition-all duration-300"
                                >
                                    Signup
                                </Link>
                            </>
                        ) : (
                            <>
                                <div className="flex items-center gap-2 border border-zinc-600 rounded-full px-4 py-0.5">
                                    <p className="w-fit text-accent">
                                        {session?.user.username}
                                    </p>

                                    <span className="w-2 inline-block h-2 bg-green-600 rounded-full"></span>
                                </div>
                                <Logout />
                            </>
                        )}
                    </div>
                    <div className="sm:hidden">
                        <HamMenu isAuthenticated={isAuthenticated} />
                    </div>
                </div>
            </div>
        </nav>
    );
}
