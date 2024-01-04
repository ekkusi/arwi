import { useState } from "react";
import { Dimensions } from "react-native";
import Animated, { runOnJS, useAnimatedStyle, useDerivedValue, useSharedValue } from "react-native-reanimated";
import { ReText } from "react-native-redash";
import { parseFloatToGradeString } from "../helpers/evaluationUtils";
import CView from "./primitives/CView";
import { Slider } from "./Slider";
import CText from "./primitives/CText";
import { COLORS } from "../theme";

const windowWidth = Dimensions.get("window").width;
const DEFAULT_SLIDER_HORIZONTAL_MARGIN = 30;
const DEFAULT_SLIDER_WIDTH = windowWidth - DEFAULT_SLIDER_HORIZONTAL_MARGIN * 2;

export default function SliderWithScale({
  minValue,
  maxValue,
  step,
  initialValue,
  ticks,
  onUpdate,
}: {
  minValue: number;
  maxValue: number;
  step: number;
  initialValue: number;
  ticks: number[];
  onUpdate: (newValue: number) => void;
}) {
  const value = useSharedValue<number>(initialValue);

  const translate = useDerivedValue(() => ((value.value - minValue) / (maxValue - minValue)) * DEFAULT_SLIDER_WIDTH);

  const valueString = useDerivedValue(() => `${parseFloatToGradeString(value.value)}`);

  const thumbAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translate.value }],
    };
  });

  const valueStringAnimatedStyle = useAnimatedStyle(() => {
    return {
      width: 100,
      fontSize: 25,
      fontWeight: "500",
      transform: [{ translateX: translate.value - 50 }],
      textAlign: "center",
    };
  });

  const maxTrackAnimatedStyle = useAnimatedStyle(() => {
    return {
      width: translate.value,
    };
  });

  const onValueChanged = (newValue: number) => {
    "worklet";

    if (Number.isNaN(newValue)) {
      return;
    }

    value.value = newValue;
  };

  const tickGap = DEFAULT_SLIDER_WIDTH / (maxValue - minValue);

  return (
    <CView style={{ width: "100%", paddingLeft: 16 }}>
      <ReText text={valueString} style={valueStringAnimatedStyle} />
      <Slider
        width={DEFAULT_SLIDER_WIDTH}
        minValue={minValue}
        maxValue={maxValue}
        step={step}
        thumbAnimatedStyle={thumbAnimatedStyle}
        maxTrackAnimatedStyle={maxTrackAnimatedStyle}
        initialTranslateX={translate.value}
        onUpdate={onValueChanged}
        onEnd={() => {
          "worklet";

          runOnJS(onUpdate)(value.value);
        }}
      />
      <CView style={{ width: "100%", height: 60 }}>
        {ticks.map((tick) => {
          const tickTranslate = tickGap * (tick - minValue);
          return (
            <CView
              style={{
                width: 60,
                position: "absolute",
                transform: [{ translateX: -30 + tickTranslate }],
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <CView style={{ height: 10, width: 1, backgroundColor: "gray" }} />
              <CText style={{ fontSize: "sm" }}>{tick.toString()}</CText>
            </CView>
          );
        })}
      </CView>
    </CView>
  );
}
