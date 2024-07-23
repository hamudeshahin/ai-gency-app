import { Image, StyleSheet } from "react-native";
import React from "react";
import { ThemedView } from "../ThemedView";
import { ThemedText } from "../ThemedText";

type CategoryItemProps = {
  cat_id: number;
  cat_name: string;
};

const CategoryItem = (props: CategoryItemProps) => {
  const { cat_id, cat_name } = props;

  return (
    <ThemedView className="border border-gray-400 mr-5 px-2 py-2 rounded-lg w-52">
      <Image
        source={{
          uri: `https://picsum.photos/id/${cat_id}/200/200`,
        }}
        className="w-full h-20 object-cover rounded-lg"
      />
      <ThemedText className="text-lg font-medium text-center mt-2">
        {cat_name}
      </ThemedText>
    </ThemedView>
  );
};

export default CategoryItem;

const styles = StyleSheet.create({});
