import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Animated, {
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";
import {
  Canvas,
  Rect,
  SweepGradient,
  Skia,
  Shader,
  vec,
  Circle,
  LinearGradient,
} from "@shopify/react-native-skia";

const CircleGradient = () => {
  const scale = useSharedValue<number>(1);
  const rotate = useDerivedValue(() => {
    return `${scale.value * 2}rad`;
  });

  const rotateStyles = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${rotate.value}rad` }],
    };
  });

  React.useEffect(() => {
    scale.value = withRepeat(
      withTiming(scale.value * 4, { duration: 5000 }),
      -1,
      true
    );
  }, []);
  const r = 200 / 2;
  return (
    <Animated.View
      style={[
        {
          width: 200,
          height: 200,
          overflow: "hidden",
          marginHorizontal: "auto",
        },
        rotateStyles,
      ]}
      className={"rounded-full"}
    >
      <Canvas style={[{ width: 200, height: 200 }]}>
        <Circle cx={r} cy={r} r={r}>
          <LinearGradient
            start={vec(1, 1)}
            end={vec(2 * r, 2 * r)}
            colors={["#000", "#fa5560", "#4d91ff"]}
          />
        </Circle>
      </Canvas>
    </Animated.View>
  );
};

export default CircleGradient;

const styles = StyleSheet.create({});
