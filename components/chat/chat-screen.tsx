import useFetch from "@/hooks/useFetch";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Image, TouchableOpacity, TextInput } from "react-native";
import {
    Bubble,
    GiftedChat,
    Send,
    Avatar,
    InputToolbar,
} from "react-native-gifted-chat";
import { ThemedView } from "../ThemedView";
import { ThemedText } from "../ThemedText";
import { AntDesign, Entypo, Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { aiImages } from "@/data/data";
import { AnimatePresence, MotiView } from "moti";

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

async function sendMessage(params: { chat_id: string; message: string }) {
    console.log("sendMessage _____", params);

    const url = `https://aigency.dev/api/v1/sendMessage`;

    const formData = new FormData();
    formData.append("chat_id", params.chat_id);
    formData.append("message", params.message);
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

    const router = useRouter();

    const [currentMessage, setCurrentMessage] = useState<string>("");
    const [isSending, setIsSending] = useState<boolean>(false);

    const messagesRef = React.useRef<any>(null);

    const { data, isLoading, error } = useFetch({
        callApiFunc: fetchChatData,
        callOnMount: true,
        params: id,
    });

    const {
        data: sendMessageData,
        isLoading: sendMessageLoading,
        error: sendMessageError,
    } = useFetch({
        callApiFunc: sendMessage,
        callOnMount: false,
        params: {},
    });

    console.log("sendMessageData");
    console.log(sendMessageData);
    console.log("senMessageError");
    console.log(sendMessageError);

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
                        avatar:
                            message.from === "user"
                                ? "https://placeimg.com/140/140/any"
                                : aiImages.get(data?.ai_id)?.image,
                    },
                };
            }) || []
        );
    }, [data]);

    const scrollToBottom = useCallback(() => {
        console.log("messagesRef.current");
        console.log(messagesRef.current);

        messagesRef.current?.scrollToEnd({ animated: true });
    }, [messagesRef]);

    const onSend = useCallback(
        async (
            messages: {
                _id: string;
                createdAt: string;
                text: string;
                user: { _id: string };
            }[] = []
        ) => {
            console.log("On Send", messages);
            setMessages((previousMessages) =>
                GiftedChat.append(previousMessages, messages as any, false)
            );

            setIsSending(true);
            const receivedMessage = await sendMessage({
                chat_id: id,
                message: messages[0].text,
            });
            setIsSending(false);
            setMessages((previousMessages) =>
                GiftedChat.append(
                    previousMessages,
                    [
                        {
                            _id: previousMessages.length + 1,
                            text: receivedMessage?.answer?.message,
                            createdAt: new Date(),
                            user: {
                                _id: 2,
                                name: data?.ai_name,
                                avatar: aiImages.get(data?.ai_id)?.image,
                            },
                        },
                    ],
                    false
                )
            );
            scrollToBottom();
        },
        [data, scrollToBottom]
    );

    const showSendBtn = useMemo(() => {
        return currentMessage?.length > 0;
    }, [currentMessage]);

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
            <>
                <ThemedView className="px-4 pb-2 border-b border-gray-600 flex-row justify-between">
                    <ThemedView className="flex-row gap-3 items-center">
                        <TouchableOpacity
                            className="bg-gray-200/10 items-center justify-center w-10 h-10 rounded-full"
                            onPress={() => router.back()}
                        >
                            <Entypo
                                name="chevron-left"
                                size={24}
                                color={"white"}
                            />
                        </TouchableOpacity>
                        <ThemedText type="subtitle">{data?.ai_name}</ThemedText>
                    </ThemedView>
                    <TouchableOpacity className="bg-gray-200/5 items-center justify-center w-10 h-10 rounded-full">
                        <Entypo
                            name="dots-three-vertical"
                            size={18}
                            color={"white"}
                        />
                    </TouchableOpacity>
                </ThemedView>
                <GiftedChat
                    messageContainerRef={messagesRef}
                    renderBubble={(props) => {
                        return (
                            <Bubble
                                {...props}
                                wrapperStyle={{
                                    right: {
                                        backgroundColor: "#2e64e5",
                                    },
                                }}
                            />
                        );
                    }}
                    renderAvatar={({ currentMessage, ...props }) => {
                        const avatarUri = currentMessage?.user?.avatar || "";
                        return (
                            <Avatar
                                {...props}
                                renderAvatar={() => {
                                    return (
                                        <Image
                                            {...props}
                                            source={{
                                                uri: avatarUri
                                                    ? String(avatarUri)
                                                    : undefined,
                                            }}
                                            style={{
                                                width: 40,
                                                height: 40,
                                                borderRadius: 20,
                                            }}
                                        />
                                    );
                                }}
                            />
                        );
                    }}
                    messages={[...formattedMessages, ...messages]
                        .slice()
                        .reverse()}
                    inverted={true}
                    onSend={(messages) => onSend(messages as any)}
                    user={{
                        _id: 1,
                    }}
                    listViewProps={{
                        ref: null,
                    }}
                    isTyping={isSending}
                    scrollToBottom={true}
                    scrollToBottomStyle={{
                        backgroundColor: "#2e64e5",
                    }}
                    textInputProps={{
                        placeholderTextColor: "#666",
                        onChange: (e: any) => {
                            setCurrentMessage(e.nativeEvent.text);
                        },
                        style: {
                            color: "white",
                            height: 44,
                            borderBox: "box-sizing",
                            paddingVertical: 12,
                            paddingHorizontal: 16,
                            backgroundColor: "#1e1e1e",
                            flex: 1,
                        },
                    }}
                    renderInputToolbar={(props: any) => {
                        return (
                            <InputToolbar
                                {...props}
                                containerStyle={{
                                    borderTopWidth: 1,
                                    borderTopColor: "#444",
                                    backgroundColor: "#1e1e1e",
                                }}
                                renderSend={(props: any) => {
                                    return (
                                        <AnimatePresence>
                                            <TouchableOpacity
                                                key={"CameraBtn"}
                                                style={{
                                                    width: 44,
                                                    height: 44,
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                    backgroundColor: "#222",
                                                }}
                                                onPress={() => {
                                                    alert("Camera");
                                                }}
                                            >
                                                <Feather
                                                    name="camera"
                                                    size={24}
                                                    color={"white"}
                                                />
                                            </TouchableOpacity>
                                            {currentMessage?.length > 0 && (
                                                <MotiView
                                                    key={"SendBtn"}
                                                    from={{
                                                        opacity: 0,
                                                        width: 0,
                                                    }}
                                                    animate={{
                                                        opacity: 1,
                                                        width: 44,
                                                    }}
                                                    exit={{
                                                        opacity: 0,
                                                        width: 0,
                                                    }}
                                                    transition={{
                                                        type: "timing",
                                                        duration: 300,
                                                    }}
                                                    exitTransition={{
                                                        type: "timing",
                                                        duration: 300,
                                                    }}
                                                >
                                                    <Send
                                                        {...props}
                                                        onPress={() => {
                                                            props.onSend({
                                                                text: props.text,
                                                            });
                                                        }}
                                                        containerStyle={{
                                                            width: 44,
                                                            height: 44,
                                                            alignItems:
                                                                "center",
                                                            justifyContent:
                                                                "center",
                                                            backgroundColor:
                                                                "#2e64e5",
                                                        }}
                                                    >
                                                        <AntDesign
                                                            name="arrowup"
                                                            size={24}
                                                            color={"white"}
                                                        />
                                                    </Send>
                                                </MotiView>
                                            )}
                                        </AnimatePresence>
                                    );
                                }}
                            />
                        );
                    }}
                />
            </>
        );
    }, [
        data,
        isLoading,
        error,
        messages,
        onSend,
        router,
        formattedMessages,
        showSendBtn,
        setCurrentMessage,
        messagesRef,
        isSending,
    ]);

    return content;
};

export default ChatScreen;
