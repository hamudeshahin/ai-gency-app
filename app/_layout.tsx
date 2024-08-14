import {
    DarkTheme,
    DefaultTheme,
    ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/useColorScheme";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ThemedView } from "@/components/ThemedView";
import { SessionProvider } from "@/context/auth.context";

import { Stack } from "expo-router";
import { DrawerProvider } from "@/components/drawer/drawer-provider";
import Drawer from "@/components/drawer/drawer";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    const colorScheme = useColorScheme();
    const [loaded] = useFonts({
        SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    });

    const insets = useSafeAreaInsets();

    useEffect(() => {
        if (loaded) {
            SplashScreen.hideAsync();
        }
    }, [loaded]);

    if (!loaded) {
        return null;
    }

    return (
        <ThemeProvider
            value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
        >
            <SessionProvider>
                <DrawerProvider>
                    <ThemedView
                        style={[
                            {
                                paddingTop: insets.top,
                                flex: 1,
                            },
                        ]}
                    >
                        <Stack
                            screenOptions={{
                                headerShown: false,
                            }}
                        >
                            <Stack.Screen name="(tabs)" />
                            <Stack.Screen name="(auth)" />
                            {/* <Stack.Screen name="blog" options={{ headerShown: false }} /> */}
                            <Stack.Screen name="+not-found" />
                        </Stack>
                    </ThemedView>
                    <Drawer />
                </DrawerProvider>
            </SessionProvider>
        </ThemeProvider>
    );
}
