import ChatBase from "@/components/chat/ChatBase";
import { fetchChats } from "@/fetch/chatsFetch";
import { fetchChatGroup, fetchChatUsers } from "@/fetch/groupFetch";
import { ChatGroupType, GroupChatUserType, MessageType } from "@/types";
import { notFound } from "next/navigation";
import React from "react";

export default async function page({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    if (id?.length !== 36) {
        return notFound();
    }
 

    const group: ChatGroupType | null = await fetchChatGroup(id);
    if (group === null) {
        return notFound();
    }

    const users: Array<GroupChatUserType> | [] = await fetchChatUsers(
        id
    );
    const chats : Array<MessageType> | [] = await fetchChats(id)
    console.log("The group id is ", id);
    return (
        <div>
            <ChatBase users={users} group={group} oldMessages={chats} />
        </div>
    );
}
