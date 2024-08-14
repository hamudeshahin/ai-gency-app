import React, { useMemo } from "react";

import { useLocalSearchParams } from "expo-router";
import AiChatsScreen from "@/components/chat/ai-chats-screen";
import ChatScreen from "@/components/chat/chat-screen";

const OneChatScreen = () => {
    const { id } = useLocalSearchParams();

    const isChatPage = id?.length === 2;

    const content = useMemo(() => {
        if (!id) return null;
        if (isChatPage) return <ChatScreen id={id?.at(-1)!} />;

        return <AiChatsScreen id={id?.at(0)!} />;
    }, [isChatPage, id]);

    return content;
};

export default OneChatScreen;
