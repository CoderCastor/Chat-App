import DashNav from "@/components/dashboard/DashNav";
import React from "react";
import { auth } from "@/auth";
async function Dashboard() {
    const session = await auth();

    return (
        <div>
            <DashNav name={session?.user.name || ""} image={session?.user.image || ""} />
        </div>
    );
}

export default Dashboard;
