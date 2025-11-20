"use client";
import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CustomUser } from "@/auth";
import LoginModal from "../auth/LoginModal";
import { MessageCircle } from "lucide-react";

export default function Navbar({ user }: { user?: CustomUser }) {
    return (
        <nav className="p-6 flex justify-between items-center bg-white shadow-sm">
            <span className="flex justify-center items-center gap-2">
                <MessageCircle />
                <h1 className="text-xl md:text-2xl font-extrabold">
                    Manthan
                </h1>
            </span>
            <div className="flex items-center space-x-2 md:space-x-6 text-gray-700">
                <Link href="/">Home</Link>
                <Link href="#features">Features</Link>

                {!user ? (
                    <LoginModal />
                ) : (
                    <Link href="/dashboard">
                        <Button>Dashboard</Button>
                    </Link>
                )}
            </div>
        </nav>
    );
}
