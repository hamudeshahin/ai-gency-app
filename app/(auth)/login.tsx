import { StyleSheet } from "react-native";
import React, { useCallback, useState } from "react";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import Field from "@/components/field";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Button from "@/components/button";
// import { SvgCss } from "react-native-svg/css";

import Logo from "../../assets/logo/logo.svg";
import BackBtn from "@/components/back-btn";
import { Link, useRouter } from "expo-router";
import { loginUser, useSession } from "@/context/auth.context";

// validation with zod
const schema = z.object({
    email: z.string().email(),
    password: z.string().nonempty(),
});
// zod schema type
export type LoginFormSchemaType = z.infer<typeof schema>;

const LoginScreen = () => {
    const { signIn, isLoading, session } = useSession();

    const router = useRouter();
    const [loading, setLoading] = useState<boolean>(false);

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormSchemaType>({
        defaultValues: {
            email: "",
            password: "",
        },
        resolver: zodResolver(schema),
    });

    const handleLogin = useCallback(
        async (data: LoginFormSchemaType) => {
            setLoading(true);
            try {
                const user = await loginUser(data);

                if (user?.data?.status === true) {
                    signIn({
                        ...user.data,
                        user: {
                            email: data.email,
                        },
                    });
                    // router.push("/");
                } else {
                    console.log("error");
                    alert("Giriş başarısız");
                }
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        },
        [signIn]
    );

    return (
        <ThemedView className="flex-1 px-4 relative">
            <BackBtn classNames="absolute left-4 top-4 z-10 bg-primary/40 text-white" />
            <ThemedView className="flex items-center flex-col w-full">
                <ThemedText>
                    <Logo width={200} height={100} />
                </ThemedText>
            </ThemedView>
            <ThemedText className="text-4xl font-bold text-center mb-4">
                Tekrar Hoş Geldiniz
            </ThemedText>
            <ThemedView>
                <Field
                    control={control}
                    label="E-posta adresi"
                    placeholder={"E-posta adresinizi girin"}
                    value={""}
                    onChange={(value) => console.log(value)}
                    name="email"
                    rules={{
                        required: true,
                    }}
                    errors={errors}
                />
                <Field
                    control={control}
                    label="Şifre"
                    placeholder={"Şifrenizi girin"}
                    value={""}
                    onChange={(value) => console.log(value)}
                    name="password"
                    rules={{
                        required: true,
                    }}
                    errors={errors}
                />
                <Button
                    text="Giriş Yap"
                    type="gradient"
                    onPress={handleSubmit(handleLogin)}
                    loading={loading}
                    loadingText="Giriş yapılıyor..."
                />
                <ThemedView className="flex justify-end my-1">
                    <ThemedText className="text-right">
                        Daha önce kayıt olmadınız mı?{" "}
                        <Link href="/(auth)/register">
                            <ThemedText className="text-secondary">
                                Kayıt ol
                            </ThemedText>
                        </Link>
                    </ThemedText>
                </ThemedView>
            </ThemedView>
        </ThemedView>
    );
};

export default LoginScreen;
