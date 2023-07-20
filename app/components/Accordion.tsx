import { useState } from "react";
import { useTranslation } from "react-i18next";
import { LayoutAnimation } from "react-native";
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";
import { COLORS, SPACING } from "../theme";
import CPressable from "./primitives/CPressable";
import CText from "./primitives/CText";
import CTouchableOpacity from "./primitives/CTouchableOpacity";
import CView, { CViewProps } from "./primitives/CView";

type AccordionData = {
  title: string;
  content: JSX.Element | string;
  icons?: React.ReactNode;
};

export type AccordionItemProps = CViewProps &
  Omit<AccordionData, "content"> & {
    expanded: boolean;
    onHeaderPress: () => void;
  };

export function AccordionItem({ children, title, expanded, onHeaderPress, icons, ...rest }: AccordionItemProps): JSX.Element {
  return (
    <CView style={{ marginBottom: "xxs" }} {...rest}>
      <CTouchableOpacity
        style={{
          padding: "lg",
          backgroundColor: "primary",
          flex: 1,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
        onPress={onHeaderPress}
      >
        <CText>{title}</CText>
        <CView style={{ flexDirection: "row", alignItems: "center" }}>
          {icons}
          <MaterialCommunityIcon
            name={expanded ? "chevron-up" : "chevron-down"}
            size={24}
            color={COLORS.darkgray}
            style={{ marginLeft: SPACING.sm }}
          />
        </CView>
      </CTouchableOpacity>
      {expanded && <CView style={{ padding: "md" }}>{children}</CView>}
    </CView>
  );
}

export type AccordionProps = CViewProps & { data: AccordionData[]; allowMultiple?: boolean; showAllButton?: boolean };

export function Accordion({ data, allowMultiple = false, showAllButton = allowMultiple, ...rest }: AccordionProps): JSX.Element {
  const { t } = useTranslation();
  const [expandedIndexes, setExpandedIndexes] = useState<number[]>([]);

  const expandIndex = (index: number) => {
    if (allowMultiple) {
      setExpandedIndexes([...expandedIndexes, index]);
    } else {
      setExpandedIndexes([index]);
    }
  };

  const removeIndex = (index: number) => {
    setExpandedIndexes(expandedIndexes.filter((i) => i !== index));
  };

  const handleHeaderPress = (index: number) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    if (expandedIndexes.includes(index)) {
      removeIndex(index);
    } else {
      expandIndex(index);
    }
  };

  const showAll = () => {
    // LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpandedIndexes(data.map((_, index) => index));
  };

  const hideAll = () => {
    // LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpandedIndexes([]);
  };

  return (
    <CView {...rest}>
      {showAllButton && (
        <CView style={{ flexDirection: "row", justifyContent: "flex-end", paddingBottom: "sm" }}>
          <CPressable onPress={expandedIndexes.length > 0 ? hideAll : showAll}>
            <CText>
              {expandedIndexes.length > 0 ? t("components.Accordion.hideAll", "Piilota kaikki") : t("components.Accordion.showAll", "Näytä kaikki")}
            </CText>
          </CPressable>
        </CView>
      )}
      {data.map((item, index) => (
        <AccordionItem
          key={`${item.title}-${index}`}
          expanded={expandedIndexes.includes(index)}
          onHeaderPress={() => handleHeaderPress(index)}
          {...item}
        >
          {item.content}
        </AccordionItem>
      ))}
    </CView>
  );
}
