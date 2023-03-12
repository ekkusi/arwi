"use client";

import { Flex, Tag, Text } from "@/components/chakra";
import { Rating } from "@/gql/graphql";
import { formatRatingNumberString } from "@/utils/dataMappers";
import { FlexProps } from "@chakra-ui/react";
import { useState } from "react";

type RatingSelecterProps = Omit<FlexProps, "onChange"> & {
  onChange: (rating: Rating) => void;
  initialRating?: Rating | null;
};

export default function RatingSelecter({
  onChange,
  initialRating,
  ...rest
}: RatingSelecterProps) {
  const [selectedRating, setSelectedRating] = useState<Rating | null>(
    initialRating || null
  );
  const onRatingClick = (rating: Rating) => {
    setSelectedRating(rating);
    onChange(rating);
  };

  const getRatingColor = (rating: Rating) => {
    switch (rating) {
      case Rating.Poor:
        return selectedRating === rating ? "red.500" : "red.100";
      case Rating.Fair:
        return selectedRating === rating ? "orange.500" : "orange.100";
      case Rating.Good:
        return selectedRating === rating ? "yellow.500" : "yellow.100";
      case Rating.Great:
        return selectedRating === rating ? "green.500" : "green.100";
      default:
        return selectedRating === rating ? "green.600" : "green.400";
    }
  };

  return (
    <Flex width="100%" {...rest}>
      {(Object.keys(Rating) as Array<keyof typeof Rating>).map((key) => {
        const rating = Rating[key];
        return (
          <Tag
            flex="1"
            variant="solid"
            bg={getRatingColor(rating)}
            color={selectedRating === rating ? "white" : "black"}
            fontWeight={selectedRating === rating ? "bold" : "normal"}
            key={key}
            onClick={() => onRatingClick(rating)}
            borderRadius="0"
            borderRight="0"
            borderColor="black"
            p="2"
            _first={{
              borderLeftRadius: "md",
            }}
            _last={{
              borderRight: "2px solid black",
              borderRightRadius: "md",
            }}
            whiteSpace="nowrap"
            _hover={{
              cursor: "pointer",
            }}
          >
            <Text
              borderStyle="solid"
              borderColor="white"
              borderWidth={selectedRating === rating ? 2 : 0}
              borderRadius="full"
              p="1"
              width="35px"
              height="35px"
              as="span"
              display="inline-flex"
              alignItems="center"
              justifyContent="center"
            >
              {formatRatingNumberString(rating)}
            </Text>
          </Tag>
        );
      })}
    </Flex>
  );
}
