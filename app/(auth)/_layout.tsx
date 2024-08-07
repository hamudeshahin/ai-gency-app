import { useSession } from "@/context/auth.context";
import { Redirect } from "expo-router";
import { Stack } from "expo-router/stack";

export default function AuthLayout() {
  const { signIn, isLoading, session } = useSession();

  if (session) {
    // redirect to home
    return <Redirect href={"/"} />;
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    />
  );
}
