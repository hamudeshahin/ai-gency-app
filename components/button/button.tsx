import {
  GestureResponderEvent,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useCallback, useMemo } from "react";
import { ThemedText } from "../ThemedText";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";

type ButtonProps = {
  text: string;
  onPress?: (event: GestureResponderEvent) => void;
  loading?: boolean;
  type?: "primary" | "secondary" | "gradient";
  classNames?: string;
  gradientClassName?: string;
  textClassNames?: string;
  href?: string;
};

const Button = (props: ButtonProps) => {
  const {
    text,
    onPress,
    loading,
    type = "primary",
    classNames,
    gradientClassName,
    textClassNames,
    href,
  } = props;

  const router = useRouter();

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
    } rounded-md focus:opacity-50 relative ${
      loading ? "opacity-50" : ""
    } ${classNames}`;
  }, [bgClassNames, loading, type, classNames]);

  const __textClassNames = useMemo(() => {
    return `text-white text-center ${textClassNames}`;
  }, [type, textClassNames]);

  const maybeGradient = useMemo(() => {
    if (type === "gradient") {
      return (
        <LinearGradient
          //   colors={["#fa5560", "#3b5998", "#4d91ff"]}
          colors={["#fa5560", "#4d91ff"]}
          start={{ x: 0.0, y: 1.0 }}
          end={{ x: 1.0, y: 1.0 }}
          className={`p-4 rounded-md w-full ${gradientClassName}`}
        >
          <ThemedText className={__textClassNames}>{maybeLoading}</ThemedText>
        </LinearGradient>
      );
    }
    return <ThemedText className={__textClassNames}>{maybeLoading}</ThemedText>;
  }, [type, maybeLoading, gradientClassName, __textClassNames]);

  const handleHref = useCallback(() => {
    if (!href) return;
    router.push(href);
  }, [href, router]);

  return (
    <TouchableOpacity
      className={parentClassNames}
      onPress={(e) => {
        handleHref();
        onPress?.(e);
      }}
    >
      {maybeGradient}
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({});
