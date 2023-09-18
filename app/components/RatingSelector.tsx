import { Rating } from "arwi-backend/src/types";
import { useState } from "react";
import { Alert, NativeScrollEvent, NativeSyntheticEvent } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { hexToRgbA } from "../helpers/color";
import { formatRatingNumber, formatRatingNumberString, getColorForGrade } from "../helpers/dataMappers";
import { COLORS } from "../theme";
import CPressable from "./primitives/CPressable";
import CText from "./primitives/CText";
import CView, { CViewProps } from "./primitives/CView";

type RatingSelecterProps = Omit<CViewProps, "onChange"> & {
  onChange: (rating: Rating | null) => void;
  disabled?: boolean;
  initialRating?: Rating | null;
};

const ratingKeys = Object.keys(Rating) as Array<keyof typeof Rating>;

export default function RatingSelecter({ onChange, disabled = false, initialRating, ...rest }: RatingSelecterProps) {
  const [selectedRating, setSelectedRating] = useState<Rating | null>(initialRating || null);

  const onRatingClick = (rating: Rating) => {
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

  const getRatingColor = (rating: Rating) => {
    const color = getColorForGrade(formatRatingNumber(rating));
    if (selectedRating === rating) {
      return hexToRgbA(color, 0.7);
    }
    return color;
  };

  const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetX = event.nativeEvent.contentOffset.x;
  };

  return (
    <CView {...rest} style={{ width: "100%", flexDirection: "row", justifyContent: "center", height: 70, ...rest.style }}>
      <ScrollView
        onScroll={onScroll}
        horizontal
        contentContainerStyle={{ paddingHorizontal: 53 * 3 }}
        decelerationRate={0}
        style={{ width: "100%", height: "100%" }}
        showsHorizontalScrollIndicator={false}
        snapToOffsets={[53 + 53 / 2, 106 + 53 / 2, 159 + 53 / 2, 212 + 53 / 2, 265 + 53 / 2, 318 + 53 / 2, 371 + 53 / 2]}
        snapToAlignment="center"
      >
        <CView {...rest} style={{ flexDirection: "row", justifyContent: "center", gap: 5, ...rest.style }}>
          {ratingKeys.map((key, i) => {
            const rating = Rating[key];
            let isSelected = true;
            if (disabled) {
              isSelected = false;
            } else {
              isSelected = selectedRating === rating;
            }

            return (
              <CPressable key={key} onPress={() => onRatingClick(rating)} style={{ flex: 1, justifyContent: "center" }}>
                <CView
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: getRatingColor(rating),
                    borderRadius: 30,
                    width: 60,
                    height: 60,
                    borderWidth: isSelected ? 2 : 1,
                    borderColor: isSelected ? "black" : "darkgray",
                  }}
                >
                  <CText
                    style={{
                      color: "darkgray",
                      fontWeight: isSelected ? "bold" : "normal",
                      fontSize: "md",
                      alignItems: "center",
                      textAlign: "center",
                      textAlignVertical: "center",
                      justifyContent: "center",
                    }}
                  >
                    {formatRatingNumberString(rating)}
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
