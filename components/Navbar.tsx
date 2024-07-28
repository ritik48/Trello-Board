import Link from "next/link";

export function Navbar() {
    return (
        <nav className="h-[50px] content-center">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center px-2">
                    <div className="flex items-center gap-16">
                        <span className="text-xl font-bold">Trello B.</span>
                        <Link href={"/"} className="text-sm text-muted-foreground">Tasks</Link>
                    </div>
                    <div className="flex items-center gap-4">
                        <Link text-sm
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
                    </div>
                </div>
            </div>
        </nav>
    );
}
