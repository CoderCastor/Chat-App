import DashNav from "@/components/dashboard/DashNav";
import React from "react";
import { auth, CustomUser } from "@/auth";
import CreateChat from "@/components/groupChat/CreateChat";
async function Dashboard() {
    const session = await auth();

    return (
        <div>
            <DashNav
                name={session?.user.name || ""}
                image={session?.user.image || ""}
            />
            <div className="container">
                <div className="flex justify-end mt-10">
                <CreateChat user={session?.user as CustomUser} />
            </div>
            </div>
        </div>
    );
}

export default Dashboard;
