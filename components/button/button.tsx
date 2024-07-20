import {
  GestureResponderEvent,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useMemo } from "react";
import { ThemedText } from "../ThemedText";
import { LinearGradient } from "expo-linear-gradient";

type ButtonProps = {
  text: string;
  onPress?: (event: GestureResponderEvent) => void;
  loading?: boolean;
  type?: "primary" | "secondary" | "gradient";
};

const Button = (props: ButtonProps) => {
  const { text, onPress, loading, type = "primary" } = props;

  const maybeLoading = useMemo(() => {
    if (loading) return "Yükleniyor ...";
    return text;
  }, [loading, text]);

  const bgClassNames =
    type === "gradient"
      ? ""
      : type === "primary"
      ? "bg-primary"
      : "bg-secondary";
  const parentClassNames = useMemo(() => {
    return `${bgClassNames} ${
      type !== "gradient" ? "p-4" : ""
    } rounded-md focus:opacity-50 relative ${loading ? "opacity-50" : ""}`;
  }, [bgClassNames, loading, type]);

  const maybeGradient = useMemo(() => {
    if (type === "gradient") {
      return (
        <LinearGradient
          //   colors={["#fa5560", "#3b5998", "#4d91ff"]}
          colors={["#fa5560", "#4d91ff"]}
          start={{ x: 0.0, y: 1.0 }}
          end={{ x: 1.0, y: 1.0 }}
          className="p-4 rounded-md"
        >
          <ThemedText className="text-white text-center">
            {maybeLoading}
          </ThemedText>
        </LinearGradient>
      );
    }
    return (
      <ThemedText className="text-white text-center">{maybeLoading}</ThemedText>
    );
  }, [type, maybeLoading]);

  return (
    <TouchableOpacity className={parentClassNames} onPress={onPress}>
      {maybeGradient}
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({});
