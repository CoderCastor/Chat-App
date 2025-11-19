import { DefaultSession } from "next-auth";

declare module "next-auth" {
    interface Session {
        user: {
            id: string;
            provider: string;
            token: string;
        } & DefaultSession["user"];
    }

    interface User {
        id: string;
        provider?: string;
        token?: string;
    }

    /**
     * Usually contains information about the provider being used
     * and also extends TokenSet, which is different tokens returned by OAuth Providers.
     */
    interface Account {
        provider: string;
        providerAccountId: string;
        type: string;
        access_token?: string;
        expires_at?: number;
        refresh_token?: string;
        id_token?: string;
        scope?: string;
        token_type?: string;
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        user?: {
            id: string;
            name?: string | null;
            email?: string | null;
            image?: string | null;
            provider?: string;
            token?: string;
        };
    }
}
