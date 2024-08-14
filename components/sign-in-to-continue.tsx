import React from "react";
import { ThemedView } from "./ThemedView";
import { ThemedText } from "./ThemedText";
import { EvilIcons } from "@expo/vector-icons";
import Button from "./button";

const SignInToContinueScreen = () => {
    return (
        <ThemedView className="flex-1 items-center justify-center">
            <ThemedView className="mb-2">
                <EvilIcons name="lock" color={"white"} size={200} />
            </ThemedView>
            <ThemedText className="text-2xl">
                Devam etmek için giriş yapın
            </ThemedText>
            <Button text="Giriş Yap" href="/login" classNames="mt-4" />
        </ThemedView>
    );
};

export default SignInToContinueScreen;
