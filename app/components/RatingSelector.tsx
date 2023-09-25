import { useState } from "react";
import { Alert, NativeScrollEvent, NativeSyntheticEvent } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { hexToRgbA } from "../helpers/color";
import { COLORS } from "../theme";
import { getColorForGrade, getFontWeightForGrade, getTextColorForGrade } from "../helpers/dataMappers";
import CPressable from "./primitives/CPressable";
import CText from "./primitives/CText";
import CView, { CViewProps } from "./primitives/CView";

type RatingSelecterProps = Omit<CViewProps, "onChange"> & {
  onChange: (rating: number | null) => void;
  disabled?: boolean;
  initialRating?: number | null;
};

const RATING_VALUES = [4, 5, 6, 7, 8, 9, 10];
const buttonHeight = 53;
const activeButtonHeight = 60;
const gap = 4;

export default function RatingSelecter({ onChange, disabled = false, initialRating, ...rest }: RatingSelecterProps) {
  const [selectedRating, setSelectedRating] = useState<number | null>(initialRating || null);
  const [containerWidth, setContainerWidth] = useState(0);
  const [activeIndex, setActiveIndex] = useState(5);

  const onRatingClick = (rating: number) => {
    if (disabled) {
      return;
    }
    if (selectedRating === rating) {
      setSelectedRating(null);
      onChange(null);
      return;
    }
    setSelectedRating(rating);
    onChange(rating);
  };

  const totalWidth = RATING_VALUES.length * buttonHeight + (RATING_VALUES.length - 1) * gap;
  const offsetSnaps = [...Array(RATING_VALUES.length).keys()].map((val) => (val - 1) * buttonHeight + gap * (val - 1));

  const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    let activeIdx = 0;
    for (let i = 0; i < RATING_VALUES.length; i += 1) {
      if (offsetX >= offsetSnaps[i] + buttonHeight / 2 + gap / 2) {
        activeIdx = i;
      }
      setActiveIndex(activeIdx);
    }
  };

  return (
    <CView
      {...rest}
      onLayout={(event) => setContainerWidth(event.nativeEvent.layout.width)}
      style={{ width: "100%", flexDirection: "row", height: 70, ...rest.style }}
    >
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ flexDirection: "row" }}
        snapToOffsets={offsetSnaps}
        contentOffset={{ x: offsetSnaps[4], y: 0 }}
        scrollEventThrottle={16}
        contentContainerStyle={{ paddingHorizontal: containerWidth / 2 - buttonHeight / 2 }}
        onScroll={onScroll}
        decelerationRate="fast"
      >
        <CView style={{ flexDirection: "row", gap }}>
          {RATING_VALUES.map((rating, i) => {
            let isSelected = true;
            if (disabled) {
              isSelected = false;
            } else {
              isSelected = selectedRating === rating;
            }

            return (
              <CPressable key={rating} onPress={() => onRatingClick(rating)} style={{ flex: 1, justifyContent: "center" }}>
                <CView
                  style={{
                    alignItems: "center",
                    backgroundColor: "white",
                    height: buttonHeight,
                    width: buttonHeight,
                    borderRadius: buttonHeight / 2,
                    borderWidth: 2,
                    borderColor: "lightgray",
                    padding: "sm",
                    transform: [{ scale: i === activeIndex ? 1.1 : 1 }],
                  }}
                >
                  <CText
                    style={{
                      borderWidth: 0,
                      borderColor: "white",
                      color: i === activeIndex ? "black" : "gray",
                      borderRadius: 100,
                      padding: "sm",
                      fontWeight: "500",
                      width: 35,
                      height: 35,
                      alignItems: "center",
                      textAlign: "center",
                      textAlignVertical: "center",
                      justifyContent: "center",
                    }}
                  >
                    {rating}
                  </CText>
                </CView>
              </CPressable>
            );
          })}
        </CView>
      </ScrollView>
      <CView style={{ position: "absolute", left: 0, right: 0, top: 0, bottom: 0, justifyContent: "center", alignItems: "center" }}>
        <CView
          style={{
            height: buttonHeight,
            aspectRatio: 1,
            borderColor: "darkgray",
            borderWidth: 2,
            borderRadius: buttonHeight / 2,
            transform: [{ scale: 1.1 }],
          }}
        />
      </CView>
    </CView>
  );
}
