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

export default function RatingSelecter({ onChange, disabled = false, initialRating, ...rest }: RatingSelecterProps) {
  const [selectedRating, setSelectedRating] = useState<number | null>(initialRating || null);

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

  const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetX = event.nativeEvent.contentOffset.x;
  };

  return (
    <CView {...rest} style={{ width: "100%", flexDirection: "row", height: 70, ...rest.style }}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ flexDirection: "row" }} contentOffset={{ x: 999, y: 0 }}>
        <CView style={{ flexDirection: "row", gap: 2 }}>
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
                    borderColor: isSelected ? "black" : "lightgray",
                    padding: "sm",
                  }}
                >
                  <CText
                    style={{
                      borderWidth: 0,
                      borderColor: "white",
                      color: isSelected ? "black" : "gray",
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
    </CView>
  );
}
