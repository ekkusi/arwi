import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Layout } from "react-native-reanimated";
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";
import { COLORS, SPACING } from "../theme";
import Card from "./Card";
import CAnimatedView from "./primitives/CAnimatedView";
import CPressable from "./primitives/CPressable";
import CText from "./primitives/CText";
import CTouchableOpacity from "./primitives/CTouchableOpacity";
import CView, { CViewProps } from "./primitives/CView";

type AccordionData = {
  headerContentRight?: JSX.Element;
  title: string;
  date?: string;
  isEvaluated?: boolean;
  color?: string;
  content: JSX.Element | string;
  icons?: React.ReactNode;
};

export type AccordionItemProps = CViewProps &
  Omit<AccordionData, "content"> & {
    expanded: boolean;
    onHeaderPress: () => void;
  };

export function AccordionItem({
  children,
  headerContentRight,
  title,
  date,
  isEvaluated,
  color,
  expanded,
  onHeaderPress,
  icons,
  ...rest
}: AccordionItemProps): JSX.Element {
  const { t } = useTranslation();

  return (
    <CAnimatedView layout={Layout}>
      <Card {...rest}>
        <CTouchableOpacity
          style={{
            flex: 1,
            justifyContent: "space-between",
            flexDirection: "row",
            alignItems: "center",
          }}
          onPress={onHeaderPress}
        >
          <CView style={{ flexDirection: "row", gap: 20, justifyContent: "center", alignItems: "center" }}>
            <CView>
              <CText style={{ fontSize: "md", fontWeight: "500" }}>{title}</CText>
              {color ||
                (date && (
                  <CView style={{ flexDirection: "row", gap: 5, alignItems: "center" }}>
                    {color && <CView style={{ width: 12, height: 12, borderRadius: 6, backgroundColor: color }} />}
                    {date && <CText style={{ fontSize: "sm", fontWeight: "300", color: "gray" }}>{date}</CText>}
                  </CView>
                ))}
              {isEvaluated !== undefined && (
                <CText style={{ fontSize: "sm", fontWeight: "300", color: "gray" }}>
                  {isEvaluated ? t("is-evaluated", "Arviointi tehty") : t("is-not-evaluated", "Arviointi puuttuu")}
                </CText>
              )}
            </CView>
            {headerContentRight}
          </CView>
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
        {expanded && <CView style={{ paddingVertical: "md" }}>{children}</CView>}
      </Card>
    </CAnimatedView>
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
    if (expandedIndexes.includes(index)) {
      removeIndex(index);
    } else {
      expandIndex(index);
    }
  };

  const showAll = () => {
    setExpandedIndexes(data.map((_, index) => index));
  };

  const hideAll = () => {
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
