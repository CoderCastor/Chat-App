export type ChatGroupType = {
    id: string;
    user_id: number;
    title: string;
    passcode: string;
    created_at: string;
};

export type GroupChatUserType = {
    id: number;
    name: string;
    group_id: string;
    created_at: string;
};

export type MessageType = {
    id: string;
    name: string;
    group_id: string;
    message: string;
    created_at: string;
};
