import NextAuth, { Account, Session, User } from "next-auth";
import { JWT } from "next-auth/jwt";
import Google from "next-auth/providers/google";
import axios from "axios";
import { LOGIN_URL } from "./lib/apiEndPoints";

// Extend the built-in session types
declare module "next-auth" {
    interface Session {
        user: {
            id: string;
            name: string | null;
            email: string | null;
            image: string | null;
            provider: string | null;
            token: string | null;
        };
    }

    interface User {
        id: string;
        name: string | null;
        email: string | null;
        image: string | null;
        provider?: string | null;
        token?: string | null;
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        user: {
            id: string;
            name: string | null;
            email: string | null;
            image: string | null;
            provider: string | null;
            token: string | null;
        };
    }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
    pages: {
        signIn: "/",
    },
    callbacks: {
        async signIn({ user, account }) {
            try {
                if (!account) {
                    console.log("Account is null", account);
                    return false;
                }
                console.log("The user data is ", user);
                console.log("The account data is ", account);

                const payload = {
                    email: user.email,
                    name: user.name,
                    oauth_id: account.providerAccountId,
                    provider: account.provider,
                    image: user.image,
                };

                const { data } = await axios.post(LOGIN_URL, payload);

                // Mutate the user object
                user.id = data?.user?.id.toString();
                user.token = data?.user?.token;
                user.provider = data.user.provider;

                return true;
            } catch (error) {
                console.error("Sign in error:", error);
                return false;
            }
        },

        async jwt({ token, user, trigger }) {
            // On sign in, add user data to token
            if (user) {
                token.user = {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    image: user.image,
                    provider: user.provider || null,
                    token: user.token || null,
                };
            }
            return token;
        },

        async session({ session, token }) {
            // Add user data from token to session
            if (token.user) {
                session.user = token.user;
            }
            return session;
        },
    },

    providers: [
        Google({
            authorization: {
                params: {
                    prompt: "consent",
                    access_type: "offline",
                    response_type: "code",
                },
            },
        }),
    ],
});
