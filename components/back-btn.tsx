import { StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { ThemedText } from "./ThemedText";
import Entypo from "@expo/vector-icons/Entypo";
import { useRouter } from "expo-router";

type BackBtnProps = {
  classNames?: string;
  iconTextClassName?: string;
  iconSize?: number;
  href?: string;
};

const BackBtn = (props: BackBtnProps) => {
  const { classNames, iconTextClassName, iconSize = 18, href = "/" } = props;

  const router = useRouter();

  const rootClassName = `flex w-8 h-8 justify-center items-center rounded-full bg-gray-500 ${classNames}`;

  const iconTextClassNames = `text-white ${iconTextClassName}`;
  return (
    <TouchableOpacity
      className={rootClassName}
      onPress={() => router.push(href)}
    >
      <ThemedText className={iconTextClassNames}>
        <Entypo name="chevron-thin-left" size={iconSize} color="inherit" />
      </ThemedText>
    </TouchableOpacity>
  );
};

export default BackBtn;

const styles = StyleSheet.create({});
