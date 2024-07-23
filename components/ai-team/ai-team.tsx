import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { ThemedView } from "../ThemedView";
import { ThemedText } from "../ThemedText";
import AiTeamItem from "./ai-team-item";

type AiTeamProps = {
  items: {
    ai_desc: string;
    ai_id: number;
    ai_name: string;
    is_vip: boolean;
  }[];
};

const AiTeam = (props: AiTeamProps) => {
  const { items = [] } = props;

  return (
    <ThemedView className="py-10">
      <ThemedText className="text-center mb-4" type="title">
        AI Ekibimizle Sohbet Edin
      </ThemedText>
      <ThemedText className="text-center" type="subtitle">
        Akıllı ve bilgili bir AI ekibi sunuyoruz, geniş bir yelpazede size
        yardımcı olmaya hazırız.
      </ThemedText>
      <ThemedView className="flex flex-row flex-wrap space-x-2 justify-center my-5">
        {items?.map((item) => {
          return <AiTeamItem key={item.ai_id} {...item} />;
        })}
      </ThemedView>
    </ThemedView>
  );
};

export default AiTeam;

const styles = StyleSheet.create({});
