import { Box, BoxProps, FlexProps } from "@chakra-ui/react";
import React from "react";
import Card from "../server/primitives/Card";

type FlippingCardProps = WithRequired<Omit<BoxProps, "children">, "width" | "height"> & {
  front: JSX.Element;
  back: JSX.Element;
};

function FlippingCardChild(props: FlexProps) {
  return (
    <Card
      display="flex"
      flexDirection="column"
      position="absolute"
      top="0"
      left="0"
      right="0"
      bottom="0"
      __css={{
        backfaceVisibility: "hidden",
        visibility: "visible",
      }}
      p="inherit"
      {...props}
    />
  );
}

function FlippingCard({ front, back, width, height, ...rest }: FlippingCardProps): JSX.Element {
  const [isFlipped, setIsFlipped] = React.useState(false);
  return (
    <Box
      onClick={() => setIsFlipped(!isFlipped)}
      __css={{
        perspective: "1000px",
      }}
      width={width}
      height={height}
      {...rest}
    >
      <Box
        transition="transform 0.6s"
        width="100%"
        height="100%"
        position="relative"
        transform={`rotateY(${isFlipped ? "180" : "0"}deg)`}
        px="5"
        py="4"
        __css={{
          transformStyle: "preserve-3d",
          perspective: "1000px",
        }}
      >
        <FlippingCardChild>{front}</FlippingCardChild>
        <FlippingCardChild transform="rotateY(180deg)">{back}</FlippingCardChild>
      </Box>
    </Box>
  );
}

export default FlippingCard;
