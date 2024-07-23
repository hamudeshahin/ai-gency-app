import { StyleSheet } from "react-native";
import React, { useState } from "react";
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
import { Link } from "expo-router";

// validation with zod
const schema = z.object({
  email: z.string().email(),
  password: z.string(),
});
// zod schema type
export type RegisterFormSchemaType = z.infer<typeof schema>;

const RegisterScreen = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormSchemaType>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(schema),
  });

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
        />
        <Button text="Giriş Yap" type="gradient" />
        <ThemedView className="flex justify-end my-1">
          <ThemedText className="text-right">
            Daha Önce Hesabınız var mı?{" "}
            <Link href={"/(auth)/login"}>
              <ThemedText className="text-secondary">Giriş Yap</ThemedText>
            </Link>
          </ThemedText>
        </ThemedView>
      </ThemedView>
    </ThemedView>
  );
};

export default RegisterScreen;
