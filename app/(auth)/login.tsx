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

// validation with zod
const schema = z.object({
  email: z.string().email(),
  password: z.string(),
});
// zod schema type
export type LoginFormSchemaType = z.infer<typeof schema>;

const LoginScreen = () => {
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

  return (
    <ThemedView className="flex-1 px-4">
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
          label="E-posta adresi"
          placeholder={"E-posta adresinizi girin"}
          value={""}
          onChange={(value) => console.log(value)}
          name="password"
        />
        <Button text="Giriş Yap" type="gradient" />
      </ThemedView>
    </ThemedView>
  );
};

export default LoginScreen;
