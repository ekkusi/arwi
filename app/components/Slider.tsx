import React, { useEffect } from "react";
import { Dimensions, Platform, StyleSheet, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, { useSharedValue } from "react-native-reanimated";
import type { ComponentType } from "react";
import type { StyleProp, ViewProps, ViewStyle } from "react-native";
import { COLORS } from "../theme";

export type SliderStyleProps = {
  thumbAnimatedStyle: StyleProp<Animated.AnimateStyle<StyleProp<ViewStyle>>>;
  maxTrackAnimatedStyle: StyleProp<Animated.AnimateStyle<StyleProp<ViewStyle>>>;
  maxTrackStyle?: StyleProp<ViewStyle>;
  minTrackStyle?: StyleProp<ViewStyle>;
  minTrackColor?: string;
  maxTrackColor?: string;
  thumbContainerStyle?: StyleProp<ViewStyle>;
  thumbSize?: number;
  thumbStyle?: StyleProp<ViewStyle>;
  /** width of the Slider */
  width?: number;
};
export type SliderProps = SliderStyleProps & {
  initialTranslateX: number;
  maxValue?: number;
  minValue?: number;
  onUpdate?: (value: number) => void;
  onEnd?: () => void;
  step?: number;
  ThumbComponent?: ComponentType<Pick<ViewProps, "style">>;
  /**
   * Controls touchable area.
   * bigger value & larger touch area
   */
  touchSlop?: number;
  activeOffsetX?: number | number[];
};

const DEFAULT_THUMB_SIZE = 27;
const DEFAULT_THUMB_BORDER_WIDTH = 2.25;
const DEFAULT_MAX_TRACK_HEIGHT = 9;
const DEFAULT_MIN_TRACK_HEIGHT = 9;

const windowWidth = Dimensions.get("window").width;
const DEFAULT_SLIDER_HORIZONTAL_MARGIN = 10;
const DEFAULT_SLIDER_WIDTH = windowWidth - DEFAULT_SLIDER_HORIZONTAL_MARGIN * 2;

function clamp(value: number, min: number, max: number) {
  "worklet";

  return Math.min(Math.max(value, min), max);
}

export function Slider({
  initialTranslateX,
  minValue = 0,
  maxValue = 100,
  step,
  onUpdate,
  onEnd,
  ThumbComponent = View,
  thumbAnimatedStyle,
  maxTrackAnimatedStyle,
  // Styles
  maxTrackStyle = styles.maxTrack,
  minTrackStyle = styles.minTrack,
  maxTrackColor,
  minTrackColor,
  thumbContainerStyle: thumbBoxStyle = styles.thumbBox,
  thumbSize = DEFAULT_THUMB_SIZE,
  thumbStyle = styles.thumb,
  touchSlop = 10,
  width = DEFAULT_SLIDER_WIDTH,
  activeOffsetX = [-5, 5],
}: SliderProps) {
  // console.debug("Slider rendered ✅");
  const radius = thumbSize / 2;

  const isPressed = useSharedValue(false);

  const start = useSharedValue(initialTranslateX || 0);
  const localTranslateX = useSharedValue(initialTranslateX || 0);

  useEffect(() => {
    start.value = initialTranslateX;
    localTranslateX.value = initialTranslateX;
  }, [initialTranslateX, localTranslateX, start]);

  const gesture = Gesture.Pan()
    .hitSlop(touchSlop)
    .maxPointers(1)
    .minPointers(1)
    .activeOffsetX(activeOffsetX)
    .onBegin(() => {
      isPressed.value = true;
    })
    .onUpdate((e) => {
      localTranslateX.value = e.translationX + start.value;

      if (step !== undefined) {
        const numSteps = (maxValue - minValue) / step;
        const interval = width / numSteps;

        /**
         * velocityX * 0.03 makes feel more natural?
         */
        const estimate = localTranslateX.value + e.velocityX * 0;
        const toIndex = clamp(Math.round(estimate / interval), 0, numSteps);
        if (onUpdate) {
          onUpdate(minValue + toIndex * step);
        }
      }
    })
    .onEnd(() => {
      start.value = localTranslateX.value;
      // select snap point
      // if (step !== undefined) {
      //  const numSteps = (maxValue - minValue) / step;
      //  const interval = width / numSteps;
      //
      //  /**
      //   * velocityX * 0.03 makes feel more natural?
      //   */
      //  const estimate = translateX.value + e.velocityX * 0.03;
      //  const toIndex = clamp(Math.round(estimate / interval), 0, numSteps);
      //  if (onUpdate) {
      //    onUpdate(minValue + toIndex * step);
      //  }
      // }
    })
    .onFinalize(() => {
      isPressed.value = false;
      if (onEnd) onEnd();
    });
  const thumbStyleConstant = {
    ...(touchSlop && { margin: -touchSlop, padding: touchSlop }),
    borderRadius: radius,
    left: -radius,
  };

  return (
    <View style={[styles.container, { height: thumbSize, width: width || windowWidth - thumbSize }]}>
      <View style={styles.absoluteFillCenter} pointerEvents="box-none">
        <View style={[minTrackStyle, minTrackColor ? { backgroundColor: minTrackColor } : {}]} />
      </View>
      <View style={styles.absoluteFillCenterStart} pointerEvents="box-none">
        <Animated.View style={[maxTrackStyle, maxTrackAnimatedStyle, maxTrackColor ? { backgroundColor: maxTrackColor } : {}]} />
      </View>
      <View style={styles.absoluteFillCenterStart} pointerEvents="box-none">
        <GestureDetector gesture={gesture}>
          <Animated.View style={[thumbBoxStyle, thumbStyleConstant, thumbAnimatedStyle]}>
            <ThumbComponent style={thumbStyle} />
          </Animated.View>
        </GestureDetector>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
  },
  absoluteFillCenter: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
  },
  absoluteFillCenterStart: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  thumbBox: {},
  thumb: {
    width: DEFAULT_THUMB_SIZE,
    height: DEFAULT_THUMB_SIZE,
    borderRadius: DEFAULT_THUMB_SIZE / 2,
    backgroundColor: COLORS.primary,
    borderWidth: DEFAULT_THUMB_BORDER_WIDTH,
    borderColor: COLORS.white,

    ...Platform.select({
      ios: {
        shadowOpacity: 0.35,
        shadowOffset: {
          width: 0,
          height: 0,
        },
        shadowColor: COLORS.secondary,
        shadowRadius: 6,
      },
      android: {
        elevation: 7,
      },
    }),
  },
  minTrack: {
    backgroundColor: COLORS.lightgray,
    height: DEFAULT_MIN_TRACK_HEIGHT,
    borderRadius: DEFAULT_MIN_TRACK_HEIGHT / 2,
  },
  maxTrack: {
    backgroundColor: COLORS.primary,
    height: DEFAULT_MAX_TRACK_HEIGHT,
    borderRadius: DEFAULT_MAX_TRACK_HEIGHT / 2,
  },
});
