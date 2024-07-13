import { StyleSheet, Text, View } from "react-native";
import React from "react";

type AlertProps = {
  title?: string;
  message?: string;
  type?: "error" | "warning" | "info" | "success";
};

const Alert = (props: AlertProps) => {
  // extract props
  const { title, message, type = "info" } = props;

  return (
    <View style={[styles.alert, styles[type]]}>
      <Text style={[styles.title]}>
        {title || type.charAt(0).toUpperCase() + type.slice(1)}
      </Text>
      <Text style={[styles.message]}>{message || "Something went wrong."}</Text>
    </View>
  );
};

export default Alert;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  alert: {
    padding: 10,
    borderRadius: 5,
    margin: 10,
  },
  title: {
    fontWeight: "semibold",
    fontSize: 20,
  },
  message: {
    marginTop: 5,
    fontSize: 16,
  },
  error: {
    backgroundColor: "red",
    color: "white",
  },
  warning: {
    backgroundColor: "yellow",
    color: "black",
  },
  info: {
    backgroundColor: "blue",
    color: "white",
  },
  success: {
    backgroundColor: "green",
    color: "white",
  },
});
