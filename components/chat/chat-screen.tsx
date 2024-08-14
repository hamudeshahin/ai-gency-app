import useFetch from "@/hooks/useFetch";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Image } from "react-native";
import { Bubble, GiftedChat } from "react-native-gifted-chat";
import { ThemedView } from "../ThemedView";
import { ThemedText } from "../ThemedText";

async function fetchChatData(id?: string) {
    const url = `https://aigency.dev/api/v1/resumeChat/`;

    const formData = new FormData();
    formData.append("chat_id", id as string);
    formData.append(
        "access_token",
        process.env.EXPO_PUBLIC_ACCESS_TOKEN as string
    );

    const res = await fetch(url, {
        method: "POST",
        body: formData,
        headers: {
            "Content-Type": "application/json",
        },
        cache: "default",
    });

    return await res.json();
}

type ChatScreenProps = {
    id: string;
};

type MessageItem = {
    date: string;
    from: string;
    message: string;
    title: string;
};

type ChatData = {
    ai_desc: string;
    ai_id: number;
    ai_information: string;
    ai_name: string;
    chat_id: string;
    messages: MessageItem[];
};

const ChatScreen = ({ id }: ChatScreenProps) => {
    console.log("Chat ID", id);

    const { data, isLoading, error } = useFetch({
        callApiFunc: fetchChatData,
        callOnMount: true,
        params: id,
    });

    const [messages, setMessages] = useState<
        {
            _id: number;
            text: string;
            createdAt: Date;
            user: { _id: number; name: string; avatar: string };
        }[]
    >([]);

    // format messages as per gifted chat
    // data is comming as ChatData
    // messages is an array of MessageItem
    const formattedMessages = useMemo(() => {
        return (
            data?.messages.map((message: MessageItem, index: number) => {
                return {
                    _id: index,
                    text: message.message,
                    createdAt: new Date(message.date),
                    user: {
                        _id: message.from === "user" ? 1 : 2,
                        name: message.from,
                        avatar: "https://placeimg.com/140/140/any",
                    },
                };
            }) || []
        );
    }, [data]);

    const onSend = useCallback((messages = []) => {
        setMessages((previousMessages) =>
            GiftedChat.append(previousMessages, messages)
        );
    }, []);

    const content = useMemo(() => {
        if (error)
            return (
                <ThemedView className="flex-1 items-center justify-center">
                    <ThemedText className="text-red-400 text-2xl">
                        {String(error)}
                    </ThemedText>
                </ThemedView>
            );

        return (
            <GiftedChat
                renderBubble={(props) => {
                    return (
                        <Bubble
                            {...props}
                            wrapperStyle={{
                                right: {
                                    backgroundColor: "red",
                                },
                            }}
                        />
                    );
                }}
                renderAvatar={({ currentMessage, ...props }) => {
                    console.log("props");
                    console.log(props);

                    const avatarUri = currentMessage?.user?.avatar || "";
                    return (
                        <Image
                            {...props}
                            source={{
                                uri: avatarUri ? String(avatarUri) : undefined,
                            }}
                            style={{ width: 40, height: 40, borderRadius: 20 }}
                        />
                    );
                }}
                messages={[...formattedMessages, ...messages]}
                onSend={(messages) => onSend(messages as any)}
                user={{
                    _id: 1,
                }}
            />
        );
    }, [data, isLoading, error, messages, onSend]);

    return content;
};

export default ChatScreen;
