import { ScrollView, StyleSheet } from "react-native";
import React from "react";
import { ThemedView } from "../ThemedView";
import { ThemedText } from "../ThemedText";
import CategoryItem from "./category-item";

type CategoriesProps = {
  items: {
    cat_id: number;
    cat_name: string;
  }[];
};

const Categories = (props: CategoriesProps) => {
  const { items } = props;

  return (
    <ThemedView className="py-10 pb-20">
      <ThemedText type="title" className="text-center font-bold mb-4">
        Alanlarına Göre Uzmanlarımız
      </ThemedText>
      <ThemedView>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          {items.map((item) => (
            <CategoryItem key={item.cat_id} {...item} />
          ))}
        </ScrollView>
      </ThemedView>
    </ThemedView>
  );
};

export default Categories;

const styles = StyleSheet.create({});
