"use client";

import { getSocket } from "@/lib/socket.config";
import React, { useEffect, useMemo, useState } from "react";
import { v4 as uuidV4 } from "uuid";
import { Button } from "../ui/button";
import ChatSidebar from "./ChatSidebar";
import { ChatGroupType, GroupChatUserType, MessageType } from "@/types";
import ChatNav from "./ChatNav";
import ChatUserDialog from "./ChatUserDialog";
import Chats from "./Chats";

export default function ChatBase({
    group,
    users,
    oldMessages
}: {
    group: ChatGroupType;
    users: Array<GroupChatUserType> | [];
    oldMessages : Array<MessageType> | []
}) {
    // let socket = useMemo(() => {
    //     const socket = getSocket();
    //     socket.auth = {
    //         room: groupId,
    //     };
    //     return socket.connect();
    // }, [groupId]);

    // useEffect(() => {
    //     socket.on("message", (data: any) => {
    //         console.log("The socket message is", data);
    //     });

    //     return () => {
    //         socket.close();
    //     };
    // }, []);

    const handleClick = () => {};

    const [open, setOpen] = useState(true);

    const [chatUser, setChatUser] = useState<GroupChatUserType>();
    useEffect(() => {
        const data = localStorage.getItem(group.id);
        if (data) {
            const pData = JSON.parse(data);
            setChatUser(pData);
        }
    }, [group.id]);

    return (
        <div className="flex">
            <ChatSidebar users={users} />
            <div className="w-full md:w-4/5 bg-linear-to-b from-grey-50 to-white">
                {open ? (
                    <ChatUserDialog
                        open={open}
                        setOpen={setOpen}
                        group={group}
                    />
                ) : (
                    <ChatNav chatGroup={group} users={users} />
                )}
                <Chats group={group} chatUser={chatUser} oldMessages={oldMessages} />
            </div>
        </div>
    );
}
