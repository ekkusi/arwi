import { useState } from "react";
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

  return (
    <CView {...rest} style={{ width: "100%", flexDirection: "row", justifyContent: "center", ...rest.style }}>
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
                backgroundColor: isSelected ? getColorForGrade(rating) : "white",
                borderRadius: 0,
                borderWidth: 1,
                borderColor: "black",
                padding: "sm",
                borderLeftWidth: 1,
                borderRightWidth: i === RATING_VALUES.length - 1 ? 1 : 0,
                borderBottomLeftRadius: i === 0 ? 5 : 0,
                borderTopLeftRadius: i === 0 ? 5 : 0,
                borderBottomRightRadius: i === RATING_VALUES.length - 1 ? 5 : 0,
                borderTopRightRadius: i === RATING_VALUES.length - 1 ? 5 : 0,
              }}
            >
              <CText
                style={{
                  borderWidth: 0,
                  borderColor: "white",
                  color: isSelected ? getTextColorForGrade(rating) : "black",
                  fontWeight: isSelected ? getFontWeightForGrade(rating) : "normal",
                  borderRadius: 100,
                  padding: "sm",
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
  );
}
