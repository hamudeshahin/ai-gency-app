import SignInToContinueScreen from "@/components/sign-in-to-continue";
import { useSession } from "@/context/auth.context";
import { Stack } from "expo-router";

export default function ChatsLayout() {
    const { session } = useSession();

    if (!session) {
        return <SignInToContinueScreen />;
    }

    return (
        <Stack
            screenOptions={{
                headerShown: false,
            }}
        />
    );
}
