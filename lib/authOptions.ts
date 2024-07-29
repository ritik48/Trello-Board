import { User } from "@/server/models/user";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectDb } from "./db";
import { NEXT_AUTH_SECRET } from "./constants";

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: {
                    label: "Username",
                    type: "text",
                    placeholder: "jsmith",
                },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials?.username || !credentials?.password) {
                    return null;
                }

                const { username, password } = credentials;

                await connectDb();

                const user = await User.findOne({ username, password });
                if (!user) {
                    return null;
                }

                return user;
            },
        }),
    ],
    callbacks: {
        jwt({ token, user }) {
            if (user) {
                token._id = user._id;
                token.username = user.username;
            }
            return token;
        },
        session({ token, session }) {
            if (token) {
                session.user._id = token._id;
                session.user.username = token.username;
            }
            return session;
        },
    },
    secret: NEXT_AUTH_SECRET
};
