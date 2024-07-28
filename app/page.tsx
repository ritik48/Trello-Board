import Link from "next/link";
import { VscArrowRight } from "react-icons/vsc";

export default function Home() {
    return (
        <section className="flex-1 flex items-center">
            <div className="max-w-7xl mx-auto -mt-60">
                <div className="flex flex-col justify-center items-center">
                    <h1 className="text-5xl font-bold">
                        Organize Everything, Effortlessly
                    </h1>
                    <p className="mt-3 text-sm sm:text-xl text-muted-foreground md:mt-5 md:max-w-3xl text-center">
                        Drag, drop, and done. Streamline your workflow with our
                        intuitive task management platform.
                    </p>
                    <div className="mt-5">
                        <Link
                            href={"/"}
                            className="text-lg hover:bg-zinc-700 rounded-md bg-primary text-secondary px-6 py-2 flex justify-center items-center gap-2 hover:gap-6 transition-all duration-300"
                        >
                            <span>Get Started</span>
                            <VscArrowRight />
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
