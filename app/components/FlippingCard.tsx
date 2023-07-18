import { forwardRef, useImperativeHandle, useRef } from "react";
import { Animated } from "react-native";
import { CViewStyle } from "../theme/types";
import { createViewStyles } from "../theme/utils";
import CPressable from "./primitives/CPressable";

type FlippingCardProps = {
  height: number;
  front: React.ReactNode;
  back: React.ReactNode;
  style?: CViewStyle;
};

const styles: CViewStyle = {
  width: "100%",
  alignItems: "center",
  backgroundColor: "white",
  borderRadius: 15,
  padding: "md",
};

export type FlippingCardHandle = {
  spinCard: () => void;
};

const FlippingCard = forwardRef<FlippingCardHandle, FlippingCardProps>(({ front, back, height, style }, ref) => {
  const frontStyle = createViewStyles({ ...styles, height, position: "absolute", ...style });
  const backStyle = createViewStyles({ ...styles, height, backfaceVisibility: "hidden", ...style });

  const flipAnimation = useRef(new Animated.Value(0)).current;

  let flipRotation = 0;
  flipAnimation.addListener(({ value }) => {
    flipRotation = value;
  });

  const flipToFrontStyle = {
    transform: [
      {
        rotateY: flipAnimation.interpolate({
          inputRange: [0, 180],
          outputRange: ["0deg", "180deg"],
        }),
      },
    ],
  };
  const flipToBackStyle = {
    transform: [
      {
        rotateY: flipAnimation.interpolate({
          inputRange: [0, 180],
          outputRange: ["180deg", "360deg"],
        }),
      },
    ],
  };

  const flipToFront = () => {
    Animated.timing(flipAnimation, {
      toValue: 180,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };
  const flipToBack = () => {
    Animated.timing(flipAnimation, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const spinCard = () => {
    if (flipRotation) flipToBack();
    else flipToFront();
  };

  useImperativeHandle(ref, () => ({
    spinCard,
  }));

  return (
    <CPressable onPress={spinCard}>
      <Animated.View style={[frontStyle, flipToFrontStyle]}>{front}</Animated.View>
      <Animated.View style={[backStyle, flipToBackStyle]}>{back}</Animated.View>
    </CPressable>
  );
});

export default FlippingCard;
