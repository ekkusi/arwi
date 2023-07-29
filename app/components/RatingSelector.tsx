import { Rating } from "arwi-backend/src/types";
import { useState } from "react";
import { hexToRgbA } from "../helpers/color";
import { formatRatingNumber, formatRatingNumberString, getColorForGrade } from "../helpers/dataMappers";
import { COLORS } from "../theme";
import CPressable from "./primitives/CPressable";
import CText from "./primitives/CText";
import CView, { CViewProps } from "./primitives/CView";

type RatingSelecterProps = Omit<CViewProps, "onChange"> & {
  onChange: (rating: Rating | null) => void;
  initialRating?: Rating | null;
};

const ratingKeys = Object.keys(Rating) as Array<keyof typeof Rating>;

export default function RatingSelecter({ onChange, initialRating, ...rest }: RatingSelecterProps) {
  const [selectedRating, setSelectedRating] = useState<Rating | null>(initialRating || null);

  const onRatingClick = (rating: Rating) => {
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

  return (
    <CView {...rest} style={{ width: "100%", flexDirection: "row", justifyContent: "center", ...rest.style }}>
      {ratingKeys.map((key, i) => {
        const rating = Rating[key];
        return (
          <CPressable key={key} onPress={() => onRatingClick(rating)} style={{ flex: 1, justifyContent: "center" }}>
            <CView
              style={{
                alignItems: "center",
                backgroundColor: getRatingColor(rating),
                borderRadius: 0,
                borderWidth: 1,
                borderColor: "black",
                padding: "sm",
                borderLeftWidth: 1,
                borderRightWidth: i === ratingKeys.length - 1 ? 1 : 0,
                borderBottomLeftRadius: i === 0 ? 5 : 0,
                borderTopLeftRadius: i === 0 ? 5 : 0,
                borderBottomRightRadius: i === ratingKeys.length - 1 ? 5 : 0,
                borderTopRightRadius: i === ratingKeys.length - 1 ? 5 : 0,
              }}
            >
              <CText
                style={{
                  borderWidth: selectedRating === rating ? 2 : 0,
                  borderColor: "white",
                  color: selectedRating === rating ? "white" : "black",
                  fontWeight: selectedRating === rating ? "bold" : "normal",
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
                {formatRatingNumberString(rating)}
              </CText>
            </CView>
          </CPressable>
        );
      })}
    </CView>
  );
}
