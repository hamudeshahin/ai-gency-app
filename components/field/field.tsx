import { StyleSheet, Text, TextInput, View } from "react-native";
import React, { useCallback } from "react";
import { ThemedView } from "../ThemedView";
import { ThemedText } from "../ThemedText";
import { Colors } from "@/constants/Colors";
import {
  Control,
  Controller,
  FieldValues,
  RegisterOptions,
} from "react-hook-form";

type FieldProps = {
  label?: string;
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  name: string;
  //   control?: Control<FieldValues>;
  control?: any;
  rules?: Omit<
    RegisterOptions<FieldValues, string>,
    "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"
  >;
  errors: Record<string, object>;
  autoCapitalize?: "none" | "sentences" | "words" | "characters";
};

const Field = (props: FieldProps) => {
  const {
    label,
    placeholder,
    value,
    onChange: onChangeCB,
    name,
    control,
    rules,
    errors = {},
    autoCapitalize = "none",
  } = props;

  const isError = errors[name] ? true : false;

  // maybe there is label
  const maybeLabel = label ? (
    <ThemedText className="mb-2">{label}</ThemedText>
  ) : null;

  const __onChange = useCallback(
    (value: string, onChange: (...event: any[]) => void) => {
      if (onChangeCB) {
        onChangeCB(value);
      }
      onChange(value);
    },
    [onChangeCB]
  );

  const inputClassNames = `bg-[#1e1e1e] border border-gray-300 rounded p-2 py-4 text-white focus:border-red-400 ${
    isError ? "border-red-400" : ""
  }`;

  return (
    <Controller
      control={control}
      rules={rules}
      render={({ field: { onChange, onBlur, value } }) => (
        <ThemedView className="mb-2">
          {maybeLabel}
          <TextInput
            className={inputClassNames}
            placeholder={placeholder}
            value={value}
            onChangeText={(value) => __onChange(value, onChange)}
            placeholderTextColor={"#687076"}
            cursorColor={"#fa5560"}
            selectionColor={"#fa5560"}
            autoCapitalize={autoCapitalize}
          />
          {isError && (
            <ThemedText className="text-red-400 text-xs mt-1">
              {String((errors[name] as any).message)}
            </ThemedText>
          )}
        </ThemedView>
      )}
      name={name}
    />
  );
};

export default Field;

const styles = StyleSheet.create({});
