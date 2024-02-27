import { useState } from "react";
import { ScrollView } from "react-native-gesture-handler";
import Animated from "react-native-reanimated";
import { COLORS } from "../theme";
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

function RatingButton({ rating, onRatingClick, isSelected }: { rating: number; onRatingClick: (rating: number) => void; isSelected: boolean }) {
  return (
    <CPressable onPress={() => onRatingClick(rating)} style={{ flex: 1, justifyContent: "center" }}>
      <Animated.View
        style={[
          {
            alignItems: "center",
            backgroundColor: "white",
            height: buttonHeight,
            width: buttonHeight,
            borderRadius: buttonHeight / 2,
            borderWidth: 2,
            borderColor: isSelected ? COLORS.black : COLORS.lightgray,
            justifyContent: "center",
            transform: [{ scale: isSelected ? 1.05 : 1 }],
          },
        ]}
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
            textAlign: "center",
            textAlignVertical: "center",
          }}
        >
          {rating}
        </CText>
      </Animated.View>
    </CPressable>
  );
}
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
    <CView {...rest} style={{ width: "100%", flexDirection: "row", height: 70, ...rest.style }}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ flexDirection: "row" }}
        contentOffset={{ x: 999, y: 0 }}
        contentContainerStyle={{ paddingHorizontal: 10 }}
      >
        <CView style={{ flexDirection: "row", gap: 4 }}>
          {RATING_VALUES.map((rating) => {
            let isSelected = true;
            if (disabled) {
              isSelected = false;
            } else {
              isSelected = selectedRating === rating;
            }

            return <RatingButton key={rating} rating={rating} isSelected={isSelected} onRatingClick={onRatingClick} />;
          })}
        </CView>
      </ScrollView>
    </CView>
  );
}
