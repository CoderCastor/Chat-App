import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import SessionProvider from "@/providers/SessionProvider";
import { auth } from "@/auth";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

const inter = Inter({
    variable: "--font-inter",
    weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
    title: "Chat App",
    description: "Chat anytime with me",
};

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const session = await auth();
    return (
        <html lang="en" suppressHydrationWarning>
            <body
                className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} antialiased`}
            >
                <Toaster richColors duration={10000}/>
                <SessionProvider session={session}>{children}</SessionProvider>
            </body>
        </html>
    );
}
