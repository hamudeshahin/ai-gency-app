import React, { useMemo } from "react";
import { ThemedView } from "../ThemedView";
import { ThemedText } from "../ThemedText";
import { AnimatePresence, MotiView } from "moti";
import { useDrawer } from "./drawer-provider";
import Button from "../button";
import { TouchableOpacity } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useSession } from "@/context/auth.context";

const Drawer = () => {
    const { isOpen, closeDrawer } = useDrawer();
    const insets = useSafeAreaInsets();

    const { userData, session, signOut } = useSession();

    console.log("userData");
    console.log(userData);

    const maybeLogoutBtn = useMemo(() => {
        if (session) {
            return <Button text="Logout" onPress={() => signOut()} />;
        }
        return null;
    }, [session]);

    const maybeUserEmail = useMemo(() => {
        if (userData) {
            return <ThemedText>{userData.email}</ThemedText>;
        }
        return null;
    }, [userData]);

    return (
        <AnimatePresence>
            {isOpen && (
                <MotiView
                    key={"drawer"}
                    className="absolute top-0 bottom-0 left-0 w-[80%] h-full z-40"
                    animate={{
                        translateX: 0,
                        opacity: 1,
                    }}
                    transition={{
                        type: "timing",
                        duration: 500,
                    }}
                    exit={{
                        translateX: -1000,
                        opacity: 0,
                    }}
                    from={{
                        translateX: -1000,
                        opacity: 0,
                    }}
                >
                    <ThemedView
                        className="flex-1 h-full"
                        style={{
                            paddingTop: insets.top,
                        }}
                    >
                        {maybeUserEmail}
                        {maybeLogoutBtn}
                    </ThemedView>
                </MotiView>
            )}
            {isOpen && (
                <MotiView
                    className="bg-white/20 blur-[20px] absolute top-0 right-0 w-full h-full z-30"
                    animate={{
                        opacity: 1,
                    }}
                    from={{
                        opacity: 0,
                    }}
                    transition={{
                        type: "timing",
                        duration: 500,
                    }}
                    exit={{
                        opacity: 0,
                    }}
                >
                    <TouchableOpacity
                        style={{ flex: 1 }}
                        onPress={() => closeDrawer()}
                    />
                </MotiView>
            )}
        </AnimatePresence>
    );
};

export default Drawer;
