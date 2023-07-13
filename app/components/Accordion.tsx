import { PropsWithChildren, useState } from "react";
import { LayoutAnimation } from "react-native";
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";
import { COLORS } from "../theme";
import CText from "./primitives/CText";
import CTouchableOpacity from "./primitives/CTouchableOpacity";
import CView, { CViewProps } from "./primitives/CView";

type AccordionData = {
  title: string;
  content: JSX.Element | string;
  expanded: boolean;
  onHeaderPress: () => void;
};

type AccordionItemProps = PropsWithChildren & Omit<AccordionData, "content">;

type AccordionProps = CViewProps & { data: AccordionData[] };

export function AccordionItem({ children, title, expanded, onHeaderPress }: AccordionItemProps): JSX.Element {
  return (
    <CView style={{ paddingBottom: "md" }}>
      <CTouchableOpacity
        style={{
          padding: "lg",
          backgroundColor: "primary",
          color: "darkgrey",
          flex: 1,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
        onPress={onHeaderPress}
      >
        <CText>{title}</CText>
        <MaterialCommunityIcon name={expanded ? "chevron-up" : "chevron-down"} size={20} color={COLORS.darkgray} />
      </CTouchableOpacity>
      {expanded && <CView style={{ padding: "md" }}>{children}</CView>}
    </CView>
  );
}

export function Accordion({ data, ...rest }: AccordionProps): JSX.Element {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  function handleHeaderPress(index: number) {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpandedIndex(expandedIndex === index ? null : index);
  }

  return (
    <CView {...rest}>
      {data.map((item, index) => (
        <AccordionItem key={index} title={item.title} expanded={expandedIndex === index} onHeaderPress={() => handleHeaderPress(index)}>
          {item.content}
        </AccordionItem>
      ))}
    </CView>
  );
}
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   accordContainer: {
//     paddingBottom: 4,
//   },
//   accordHeader: {
//     padding: 12,
//     backgroundColor: "#666",
//     color: "#eee",
//     flex: 1,
//     flexDirection: "row",
//     justifyContent: "space-between",
//   },
//   accordTitle: {
//     fontSize: 20,
//   },
//   accordBody: {
//     padding: 12,
//   },
//   textSmall: {
//     fontSize: 16,
//   },
//   seperator: {
//     height: 12,
//   },
// });
