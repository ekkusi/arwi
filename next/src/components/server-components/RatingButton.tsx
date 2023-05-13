import { Button, Text, ButtonProps } from "@chakra-ui/react";
import { Rating } from "@/gql/graphql";
import { formatRatingNumberString, formatRatingString, getRatingEmoji } from "@/utils/dataMappers";

type RatingButtonProps = ButtonProps & {
  rating: Rating;
  isSelected: boolean;
};

export default function RatingButton({ rating, isSelected, ...rest }: RatingButtonProps) {
  return (
    <Button variant={isSelected ? "solid" : "outline"} flexDirection="column" py="10" borderRadius="md" {...rest}>
      <Text as="span">{formatRatingString(rating)}</Text>
      <Text as="span">
        {formatRatingNumberString(rating)} {getRatingEmoji(rating)}
      </Text>
    </Button>
  );
}
