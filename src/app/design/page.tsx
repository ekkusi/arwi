import {
  Box,
  Button,
  List,
  ListItem,
  OrderedList,
  Text,
  UnorderedList,
} from "@/components/chakra";
import { BoxProps } from "@chakra-ui/react";
import PageWrapper from "../(components)/PageWrapper";

type SectionProps = BoxProps & {
  title: string;
};

function Section({ children, title }: SectionProps) {
  return (
    <Box pb="5" borderTop="1px" _notLast={{ borderBottom: "1px" }}>
      <Text as="span" display="block" mb="5" fontStyle="italic">
        {title}
      </Text>
      {children}
    </Box>
  );
}

export default function DesignPage() {
  const fontTestSize = "lg";
  return (
    <PageWrapper>
      <Text as="h1" textAlign="center" mb="5">
        Design
      </Text>
      {/* HEADINGS */}
      <Section title="Headings - Raleway">
        <Text as="h1">Heading 1</Text>
        <Text as="h1" fontWeight="bold">
          Bolded Heading 1
        </Text>
        <Text as="h2">Heading 2</Text>
        <Text as="h3" fontWeight="bold">
          Bolded Heading 3
        </Text>
        <Text as="h3">Heading 3</Text>
        <Text as="h3" fontWeight="bold">
          Bolded Heading 3
        </Text>
      </Section>
      {/* Text styles */}
      <Section title="Normal texts - Open Sans">
        <Text>Normal text without any modifications</Text>
        <Text fontWeight="bold">Bolded text</Text>
        <Text fontStyle="italic">Italic text</Text>
      </Section>
      {/* Font tests */}
      <Section title="Font tests">
        <Text fontSize={fontTestSize}>Open sans - normal</Text>
        <Text fontSize={fontTestSize} fontWeight="bold">
          Open sans - bold
        </Text>
        <Text fontSize={fontTestSize} textTransform="uppercase">
          Open sans - uppercase
        </Text>
        <Text as="h3" fontSize={fontTestSize}>
          Raleway - normal
        </Text>
        <Text as="h3" fontSize={fontTestSize} fontWeight="bold">
          Raleway - bold
        </Text>
        <Text as="h3" fontSize={fontTestSize} textTransform="uppercase">
          Raleway - uppercase
        </Text>
      </Section>
      {/* Buttons */}
      <Section title="Buttons" display="flex" flexWrap="wrap">
        <Button mb="2" mr="2">
          Default button
        </Button>
        <Button mb="2" mr="2" variant="outline">
          Outline button
        </Button>
      </Section>
      {/* Lists */}
      <Section title="Lists">
        <Text as="span" display="blocK">
          Ordered list
        </Text>
        <OrderedList>
          <ListItem>Item 1</ListItem>
          <ListItem>Item 2</ListItem>
          <ListItem>Item 3</ListItem>
        </OrderedList>
        <Text as="span" display="blocK">
          Unordered list
        </Text>
        <UnorderedList>
          <ListItem>Item 1</ListItem>
          <ListItem>Item 2</ListItem>
          <ListItem>Item 3</ListItem>
        </UnorderedList>
        <Text as="span" display="blocK">
          Unstyled list
        </Text>
        <List>
          <ListItem>Item 1</ListItem>
          <ListItem>Item 2</ListItem>
          <ListItem>Item 3</ListItem>
        </List>
      </Section>
    </PageWrapper>
  );
}
