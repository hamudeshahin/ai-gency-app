import React, { useCallback, useEffect, useRef } from "react";

import Animated, {
  AnimatableValue,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

type FadeInFadeOutProps = {
  duration?: number;
};

const useFadeInFadeOut = (props: FadeInFadeOutProps = {}) => {
  const { duration = 2000 } = props;

  //   // ref to store the animated value
  const opacity = useSharedValue<number>(20);
  const opacityValue = useDerivedValue<number>(() => {
    return opacity.value;
  });

  //   const fadeIn = useCallback(() => {
  //     console.log("fadeIn");
  //     console.log(opacityValue.value);
  //     console.log(duration);

  //     opacityValue.value = withTiming(1, { duration });
  //   }, [duration, opacityValue]);

  //   const fadeOut = useCallback(() => {
  //     opacityValue.value = withTiming(0, { duration });
  //   }, [duration, opacityValue]);

  //   // get styles
  //   const fadeStyle = useAnimatedStyle(() => {
  //     return {
  //       opacity: opacityValue.value,
  //     };
  //   }, [fadeIn, fadeOut, opacityValue]);

  //   useEffect(() => {
  //     fadeIn();
  //     return () => {
  //       fadeOut();
  //     };
  //   }, [fadeIn, fadeOut, duration]);

  const styles = useAnimatedStyle(() => {
    return {
      opacity: opacityValue.value,
    };
  }, [opacity]);

  useEffect(() => {
    opacity.value = withRepeat(withTiming(1, { duration: 3000 }), -1, true);
  }, []);

  return {
    fadeStyle: styles,
  };
};

export default useFadeInFadeOut;
