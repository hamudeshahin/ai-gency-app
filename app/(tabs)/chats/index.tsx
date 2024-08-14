import { FlatList, Image, TouchableOpacity } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import useFetch from "@/hooks/useFetch";
import { Link, useRouter } from "expo-router";
import React, { useMemo } from "react";
import { aiImages } from "@/data/data";

export type ChatItem = {
    ai_desc: string;
    ai_id: number;
    ai_name: string;
    blog_date: string;
    total_chats: number;
    total_messages: number;
};
export type ChatsData = ChatItem[];

async function fetchChatsData() {
    const url = `https://aigency.dev/api/v1/my-chats/?access_token=${
        process.env.EXPO_PUBLIC_ACCESS_TOKEN as string
    }`;

    const res = await fetch(url);

    return (await res.json()) as ChatsData;
}

function ChatItem({ item }: { item: ChatItem }) {
    const router = useRouter();

    return (
        <TouchableOpacity
            onPress={() => router.push(`/chats/${item.ai_name}-${item.ai_id}`)}
        >
            <ThemedView className="border-b border-gray-600 p-2 mb-4 flex-row gap-4">
                <Image
                    source={{
                        uri: aiImages.get(item.ai_id)?.image,
                    }}
                    className="w-16 h-16 rounded-full border border-gray-500"
                />

                <ThemedView>
                    <ThemedText type="subtitle">{item.ai_name}</ThemedText>
                    <ThemedText type="link" numberOfLines={1}>
                        {item.ai_desc}
                    </ThemedText>
                    <ThemedText className="text-sm text-gray-500">
                        {item.blog_date}
                    </ThemedText>
                </ThemedView>
            </ThemedView>
        </TouchableOpacity>
    );
}

const ChatsScreen = () => {
    const {
        isLoading,
        error,
        data = [] as ChatsData,
    } = useFetch({
        callApiFunc: fetchChatsData,
        callOnMount: true,
        params: {},
    });

    const content = useMemo(() => {
        if (isLoading) return <ThemedText>Loading...</ThemedText>;

        if (error)
            return (
                <ThemedText className="text-red-400">
                    Error: {String(error)}
                </ThemedText>
            );

        return (
            <FlatList
                data={data}
                renderItem={({ item }) => <ChatItem item={item} />}
            />
        );
    }, [data, error, isLoading]);

    return (
        <ThemedView className="flex-1 px-4">
            <ThemedText type="title" className="mt-2 mb-4">
                Sohbetlerim
            </ThemedText>
            {content}
        </ThemedView>
    );
};

export default ChatsScreen;
