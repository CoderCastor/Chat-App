import DashNav from "@/components/dashboard/DashNav";
import { auth, CustomUser } from "@/auth";
import CreateChat from "@/components/groupChat/CreateChat";
import { fetchChatGroups } from "@/fetch/groupFetch";
import { ChatGroupType } from "@/types";
import GroupChatCard from "@/components/groupChat/GroupChatCard";
async function Dashboard() {
    const session = await auth();

    const groups: Array<ChatGroupType> | [] = await fetchChatGroups(
        session?.user?.token as string
    );

    console.log(groups)

    

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

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {groups.length > 0 &&
            groups.map((item, index) => (
              <GroupChatCard group={item} key={index} user={session?.user as CustomUser} />
            ))}
        </div>
            </div>
        </div>
    );
}

export default Dashboard;
