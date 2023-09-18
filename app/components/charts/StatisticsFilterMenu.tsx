import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";
import { useTranslation } from "react-i18next";
import { getEnvironments } from "arwi-backend/src/utils/subjectUtils";
import { useState } from "react";
import { COLORS } from "../../theme";
import CButton from "../primitives/CButton";
import CText from "../primitives/CText";
import CView from "../primitives/CView";
import CModal from "../CModal";

export default function StatisticsFilterMenu({
  subjectCode,
  filter,
  setFilter,
  title,
}: {
  subjectCode: string;
  filter: string | undefined;
  setFilter: (filter?: string) => void;
  title?: string;
}) {
  const { t } = useTranslation();
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  const environments = getEnvironments(subjectCode);

  return (
    <>
      <CModal isOpen={isFiltersOpen} onClose={() => setIsFiltersOpen(false)} placement="bottom" closeButton={false}>
        <CView style={{ flexDirection: "row", flexWrap: "wrap", alignItems: "flex-start", gap: 1, width: "100%", padding: "md" }}>
          <CButton
            key="all"
            title={t("all", "Kaikki")}
            variant="outline"
            colorScheme={filter ? "lightgray" : "darkgray"}
            style={{ margin: 3, paddingHorizontal: "md", gap: "sm" }}
            onPress={() => {
              setFilter(undefined);
              setIsFiltersOpen(false);
            }}
            textStyle={{ fontSize: "xs", fontWeight: "400", color: filter ? "gray" : "darkgray" }}
            leftIcon={<CView style={{ width: 20, height: 20, borderRadius: 10, backgroundColor: "black" }} />}
          />
          {environments.map((item) => (
            <CButton
              key={item.code}
              title={item.label}
              variant="outline"
              colorScheme={item.label === filter ? "darkgray" : "lightgray"}
              style={{ margin: 3, paddingHorizontal: "md", gap: "sm" }}
              onPress={() => {
                setIsFiltersOpen(false);
                setFilter(item.label);
              }}
              textStyle={{ fontSize: "xs", fontWeight: "400", color: item.code === subjectCode ? "darkgray" : "gray" }}
              leftIcon={<CView style={{ width: 20, height: 20, borderRadius: 10, backgroundColor: item.color }} />}
            />
          ))}
        </CView>
      </CModal>
      <CView style={{ flexDirection: "row" }}>
        <CText style={{ flex: 1, fontSize: "md", fontWeight: "300" }}>{title}</CText>
        <CButton
          size="small"
          variant="outline"
          title={filter || t("all", "Kaikki")}
          colorScheme="darkgray"
          style={{ width: "auto" }}
          leftIcon={<MaterialCommunityIcon name="filter-variant" size={25} color={COLORS.darkgray} />}
          onPress={() => setIsFiltersOpen(true)}
        />
      </CView>
    </>
  );
}
