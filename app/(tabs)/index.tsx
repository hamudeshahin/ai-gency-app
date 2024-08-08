import { StyleSheet, ScrollView } from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import useFetch from "@/hooks/useFetch";
import Alert from "@/components/Alert";
import { useNavigation } from "expo-router";
import Button from "@/components/button";

import Logo from "@/assets/logo/logo.svg";

import AiTeam from "@/components/ai-team";
import Categories from "@/components/categories";
import { MotiText } from "moti";
import { useDrawer } from "@/components/drawer/drawer-provider";

async function fetchHomeData() {
    const AIListURL = `https://aigency.dev/api/v1/ai-team-list/?access_token=${
        process.env.EXPO_PUBLIC_ACCESS_TOKEN as string
    }`;
    const categoriesListURL = `https://aigency.dev/api/v1/ai-categories/?access_token=${
        process.env.EXPO_PUBLIC_ACCESS_TOKEN as string
    }`;

    const res = await Promise.all([
        fetch(AIListURL, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            cache: "default",
        }),
        fetch(categoriesListURL, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            cache: "default",
        }),
    ]);

    const data = await Promise.all(res.map((r) => r.json()));

    return {
        aiItems: data[0],
        categoryItems: data[1],
    };
}

export default function HomeScreen() {
    const navigation = useNavigation();
    const { openDrawer } = useDrawer();
    const {
        isLoading,
        error,
        data = [],
    } = useFetch({
        callApiFunc: fetchHomeData,
        callOnMount: true,
        params: {},
    });

    // parse data
    const { aiItems = [], categoryItems = [] } = data || {};
    if (isLoading) {
        return <ThemedText>Loading...</ThemedText>;
    }

    if (error) {
        return <Alert title="Error" message={error} type="error" />;
    }

    return (
        <ScrollView>
            <ThemedView className="flex-1 px-4">
                <ThemedView className="">
                    <ThemedView className="relative flex items-center">
                        <Logo
                            width={400}
                            height={200}
                            // className="absolute z-10 -top-10 drop-shadow-2xl"
                        />
                        {/* <CircleGradient /> */}
                    </ThemedView>

                    <ThemedView className="mb-4">
                        <ThemedText type="title" className="text-left text-7xl">
                            Gerçek kişiler için akıllı
                        </ThemedText>
                        <MotiText
                            className="text-7xl font-bold text-white"
                            from={{
                                opacity: 0,
                                scale: 0.5,
                            }}
                            animate={{
                                opacity: 1,
                                scale: 1,
                            }}
                            transition={{
                                type: "timing",
                                duration: 1000,
                            }}
                        >
                            çözümler
                        </MotiText>
                        {/* <Animated.Text
              className="text-7xl font-bold text-white"
              entering={FadeIn.duration(2000)}
              exiting={FadeOut.duration(1000)}
              // style={[{}, fadeStyle]}
            >
              çözümler
            </Animated.Text> */}
                    </ThemedView>
                    <ThemedView className="flex justify-start">
                        <Button
                            type="gradient"
                            text="Giriş Yap"
                            classNames="self-start my-4"
                            gradientClassName="px-20"
                            textClassNames="font-bold"
                            href="/(auth)/login"
                        />
                        <Button
                            type="gradient"
                            text="Kayıt Ol"
                            classNames="self-start my-4"
                            onPress={() => openDrawer()}
                        />
                    </ThemedView>
                </ThemedView>
                <ThemedView className="py-24">
                    <ThemedView className="border-t-2 border-yellow-500">
                        <ThemedText
                            type="title"
                            className="py-10 leading-10 -tracking-widest"
                        >
                            Yazılım, eğitim, psikoloji ve daha birçok alanda
                            uzmanlığımızla, ekibimiz gerçek sonuçlarla elde
                            edilen akıllı çözümler sunabilir.
                        </ThemedText>
                        <Button
                            type="gradient"
                            text="Daha Fazla Bilgi"
                            classNames="self-start my-4"
                            gradientClassName="px-20"
                            textClassNames="font-bold"
                            href="/blog"
                        />
                    </ThemedView>
                </ThemedView>
                <AiTeam items={aiItems} />
                <Categories items={categoryItems} />
            </ThemedView>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    titleContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
    },
    stepContainer: {
        gap: 8,
        marginBottom: 8,
    },
    reactLogo: {
        height: 178,
        width: 290,
        bottom: 0,
        left: 0,
        position: "absolute",
    },
});
