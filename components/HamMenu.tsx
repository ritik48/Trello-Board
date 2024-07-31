"use client";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

import { IoIosMenu } from "react-icons/io";
import { signOut } from "next-auth/react";

export function HamMenu({ isAuthenticated }: { isAuthenticated: boolean }) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <IoIosMenu size={24} color="white"/>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="mr-2">
                {isAuthenticated ? (
                    <>
                        <DropdownMenuItem asChild>
                            <Link href={"/home"}>Tasks</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                            <Link
                                href={""}
                                onClick={() => signOut({ callbackUrl: "/" })}
                            >
                                Logout
                            </Link>
                        </DropdownMenuItem>
                    </>
                ) : (
                    <>
                        <DropdownMenuItem asChild>
                            <Link href={"/signin"}>Login</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                            <Link href={"/signup"}>Signup</Link>
                        </DropdownMenuItem>
                    </>
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
