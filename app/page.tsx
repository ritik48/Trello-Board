import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { VscArrowRight } from "react-icons/vsc";

export default async function Home() {
    const session = await getServerSession(authOptions);
    const isAuthenticated = !!session?.user.username;
    return (
        <section className="flex-1 flex items-center">
            <div className="max-w-7xl mx-auto -mt-60">
                <div className="flex flex-col justify-center items-center">
                    <h1 className="text-3xl sm:text-5xl font-bold text-secondary text-center">
                        Organize Everything, Effortlessly
                    </h1>
                    <p className="mt-3 sm:w-auto w-[90%] text-base sm:text-xl text-muted-foreground md:mt-5 md:max-w-3xl text-center">
                        Drag, drop, and done. Streamline your workflow with our
                        intuitive task management platform.
                    </p>
                    <div className="mt-5">
                        <Link
                            href={isAuthenticated ? "/board" : "/signin"}
                            className="text-lg bg-zinc-700 shadow-sm shadow-zinc-700 rounded-md bg-primary text-secondary px-6 py-2 flex justify-center items-center gap-2 hover:gap-6 transition-all duration-300"
                        >
                            <span>
                                {!isAuthenticated
                                    ? "Login to access task board"
                                    : "Go to task board"}
                            </span>
                            <VscArrowRight />
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
