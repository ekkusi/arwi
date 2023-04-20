import { Box, BoxProps, Flex, FlexProps } from "@chakra-ui/react";
import React from "react";
import Card from "../server-components/primitives/Card";

type FlippingCardProps = WithRequired<
  Omit<BoxProps, "children">,
  "width" | "height"
> & {
  front: React.ReactNode;
  back: React.ReactNode;
};

function FlippingCardChild(props: FlexProps) {
  return (
    <Flex
      display="flex"
      flexDirection="column"
      position="absolute"
      top="0"
      left="0"
      right="0"
      bottom="0"
      __css={{
        backfaceVisibility: "hidden",
      }}
      p="inherit"
      {...props}
    />
  );
}

function FlippingCard({
  front,
  back,
  width,
  height,
  ...rest
}: FlippingCardProps): JSX.Element {
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
      <Card
        transition="transform 0.6s"
        width="100%"
        height="100%"
        position="relative"
        transform={`rotateY(${isFlipped ? "180" : "0"}deg)`}
        __css={{
          transformStyle: "preserve-3d",
          perspective: "1000px",
        }}
      >
        <FlippingCardChild>{front}</FlippingCardChild>
        <FlippingCardChild transform="rotateY(180deg)">
          {back}
        </FlippingCardChild>
      </Card>
    </Box>
  );
}

export default FlippingCard;
