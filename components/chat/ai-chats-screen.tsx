import React, { useMemo } from "react";
import { ThemedView } from "../ThemedView";
import { ThemedText } from "../ThemedText";
import useFetch from "@/hooks/useFetch";
import { FlatList, Image, TouchableOpacity } from "react-native";
import { aiImages } from "@/data/data";
import { useRouter } from "expo-router";
import { Entypo } from "@expo/vector-icons";

async function fetchChatData(id?: string) {
    const url = `https://aigency.dev/api/v1/view-chats?access_token=${
        process.env.EXPO_PUBLIC_ACCESS_TOKEN as string
    }&ai_id=${id}`;

    const res = await fetch(url, {
        method: "GET",
        cache: "default",
    });

    return await res.json();
}

function ScreenHeader({ title }: { title: string }) {
    const router = useRouter();

    return (
        <ThemedView className="py-4 border-b border-gray-700 mb-4 flex-row gap-2 items-center">
            <TouchableOpacity
                className="bg-gray-200/10 items-center justify-center w-12 h-12 rounded-full"
                onPress={() => router.back()}
            >
                <Entypo name="chevron-left" size={24} color={"white"} />
            </TouchableOpacity>
            <ThemedText type="subtitle">{title} ile Sohbetlerim</ThemedText>
        </ThemedView>
    );
}

type AiChatItem = {
    chat_id: string;
    chat_name: string;
    last_message: string;
    download_txt: string;
    download_pdf: string;
    download_docx: string;
};

type AiChatsScreenProps = {
    id: string;
};

const AiChatsScreen = ({ id }: AiChatsScreenProps) => {
    const router = useRouter();

    const name = id.split("-")[0];
    const ai_id = id.split("-")[1];

    const { data, isLoading, error } = useFetch({
        callApiFunc: fetchChatData,
        callOnMount: true,
        params: ai_id,
    });

    const content = useMemo(() => {
        return (
            <FlatList
                data={data as AiChatItem[]}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        onPress={() =>
                            router.push(`/chats/${id}/${item.chat_id}`)
                        }
                    >
                        <ThemedView className=" mb-2 flex-row gap-2">
                            <ThemedView>
                                <Image
                                    source={{
                                        uri: aiImages.get(parseInt(ai_id))
                                            ?.image,
                                    }}
                                    className="w-16 h-16 rounded-full border border-gray-500"
                                />
                            </ThemedView>
                            <ThemedView className="justify-center flex-1">
                                <ThemedText type="subtitle">
                                    {item.chat_name}
                                </ThemedText>
                                <ThemedText
                                    numberOfLines={1}
                                    className="text-gray-400"
                                >
                                    {item.last_message}
                                </ThemedText>
                            </ThemedView>
                        </ThemedView>
                    </TouchableOpacity>
                )}
            />
        );
    }, [data, error, isLoading]);

    return (
        <ThemedView className="px-4">
            <ScreenHeader title={name} />
            {content}
        </ThemedView>
    );
};

export default AiChatsScreen;
