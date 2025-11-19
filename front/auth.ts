import NextAuth, { Account } from "next-auth";
import { JWT } from "next-auth/jwt";
import Google from "next-auth/providers/google";
import axios from "axios";
import { LOGIN_URL } from "./lib/apiEndPoints";
export interface CustomSession {
    user?: CustomUser;
    expires?: any;
}

export interface CustomUser {
    id?: string | null;
    name?: string | null;
    email?: string | null;
    image?: string | null;
    provider?: string | null;
    token?: string | null;
}

export const { handlers, auth, signIn, signOut } = NextAuth({
    pages: {
        signIn: "/",
    },
    callbacks: {
        async signIn({
            user,
            account,
        }: {
            user: CustomUser;
            account?: any;
        }) {
            try {
                if(!account){
                    console.log("Account is null",account)
                    return false
                }
                console.log("The user data is ", user);
                console.log("The account data is ", account);
                const payload = {
                    email: user.email,
                    name: user.name,
                    oauth_id: account?.providerAccountId,
                    provider: account?.provider,
                    image: user.image,
                };
                const { data } = await axios.post(LOGIN_URL, payload);
                user.id = data?.user?.id.toString();
                user.token = data?.use?.token;
                user.provider = data.user.provider
                return true;
            } catch (error) {
                return false;
            }
        },
        async session({
            session,
            
            token,
        }: {
            session: CustomSession;
            user: CustomUser;
            token: JWT;
        }) {
            session.user = token.user as CustomUser;
            return session;
        },
        async jwt({ token, user }) {
            if (user) {
                token.user = user;
            }
            return token;
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
