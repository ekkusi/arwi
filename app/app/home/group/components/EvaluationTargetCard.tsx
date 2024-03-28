import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { CollectionTypeCategory } from "arwi-backend/src/types";
import { useTranslation } from "react-i18next";
import Card from "../../../../components/ui/Card";
import CTouchableOpacity from "../../../../components/primitives/CTouchableOpacity";
import { HomeStackParams } from "../../types";
import CView from "../../../../components/primitives/CView";
import CText from "../../../../components/primitives/CText";
import { getCollectionTypeTranslation } from "../../../../helpers/translation";
import CButton from "../../../../components/primitives/CButton";
import CircledNumber from "../../../../components/ui/CircledNumber";

type EvaluationTargetCardProps = {
  navigation: NativeStackScreenProps<HomeStackParams, "group" | "final-feedback">["navigation"];
  id: string;
  groupId: string;
  collectionId?: string;
  name: string;
  archived: boolean;
  category: string;
  evaluated: boolean;
  weight: number;
  customEvent?: () => void;
};

export default function EvaluationTargetCard(props: EvaluationTargetCardProps) {
  const { t } = useTranslation();
  const { navigation, id, groupId, collectionId, name, archived, category, evaluated, weight, customEvent } = props;
  return (
    <Card
      style={{
        borderColor: "primary",
        borderWidth: 1,
        paddingHorizontal: "md",
      }}
    >
      <CTouchableOpacity
        style={{ height: 50, gap: 5, flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}
        onPress={() => {
          if (customEvent) customEvent();
          else {
            navigation.navigate("default-evaluation-collection", {
              id,
              collectionId,
              name,
              archived,
            });
          }
        }}
      >
        <CView style={{ flexDirection: "row", alignItems: "center", gap: "md" }}>
          <CircledNumber valueString={`${weight}%`} size={44} />
          <CView style={{ gap: 5, height: 50 }}>
            <CText style={{ fontSize: "md", fontWeight: "500" }}>{name}</CText>
            <CText>
              {category === "CLASS_PARTICIPATION" ? (
                <CText />
              ) : (
                <CText style={{ fontSize: "sm", color: "gray" }}>{getCollectionTypeTranslation(t, category as CollectionTypeCategory)}, </CText>
              )}
              <CText style={{ fontSize: "sm", color: "gray" }}>
                {category === "CLASS_PARTICIPATION"
                  ? t("evaluated-continuously", "jatkuvasti arvioitava")
                  : t("evaluated-once", "Kerran arvioitava").toLocaleLowerCase()}
              </CText>
            </CText>
          </CView>
        </CView>
        {category !== "CLASS_PARTICIPATION" && (
          <>
            {!evaluated && (
              <CButton
                variant="empty"
                textStyle={{ fontSize: "sm", fontWeight: "500" }}
                title={t("evaluate", "Arvioi").toLocaleUpperCase()}
                onPress={() => {
                  navigation.navigate("default-collection-create", { groupId, collectionTypeId: id });
                }}
              />
            )}
            {evaluated && (
              <CText style={{ color: "gray", fontSize: "sm", fontWeight: "500" }}>{t("evaluated", "Arvioitu").toLocaleUpperCase()}</CText>
            )}
          </>
        )}
      </CTouchableOpacity>
    </Card>
  );
}
