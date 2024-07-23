import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { ThemedView } from "../ThemedView";
import { ThemedText } from "../ThemedText";
import { Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialCommunityIcons } from "@expo/vector-icons";

type AiTeamItemProps = {
  ai_desc: string;
  ai_id: number;
  ai_name: string;
  is_vip: boolean;
};

const AiTeamItem = (props: AiTeamItemProps) => {
  const { ai_desc, ai_id, ai_name, is_vip } = props;

  const maybeVip = is_vip ? (
    <LinearGradient
      className="absolute top-2 right-2 rounded-xl p-1 z-10 flex flex-row items-center"
      colors={["#fa5560", "#4d91ff"]}
      start={{ x: 0.0, y: 1.0 }}
      end={{ x: 1.0, y: 1.0 }}
    >
      <MaterialCommunityIcons name="crown" size={18} color={"white"} />
      <Text className="text-white text-sm font-bold">VIP</Text>
    </LinearGradient>
  ) : null;

  return (
    <ThemedView key={ai_id} className="basis-1/2 border-2 border-transparent">
      <ThemedView className="relative">
        {maybeVip}
        <Image
          source={{
            // placeholder image
            uri: "https://reactnative.dev/img/tiny_logo.png",
          }}
          className="w-full h-44 object-cover"
        />
      </ThemedView>
      <ThemedView className="p-2">
        <ThemedText className="font-bold text-center text-2xl">
          {ai_name}
        </ThemedText>
        <ThemedText className="font-semibold text-center" numberOfLines={2}>
          {ai_desc}
        </ThemedText>
      </ThemedView>
    </ThemedView>
  );
};

export default AiTeamItem;
