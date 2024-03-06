import { useState } from "react";
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";
import { useTranslation } from "react-i18next";
import { Slider } from "@miblanchard/react-native-slider";
import { DefaultEvaluation, CollectionType, DefaultCollection } from "arwi-backend/src/types";
import { Alert } from "react-native";
import { COLORS } from "../../../../theme";
import CButton from "../../../../components/primitives/CButton";
import CText from "../../../../components/primitives/CText";
import CView, { CViewProps } from "../../../../components/primitives/CView";
import CircledNumber from "../../../../components/ui/CircledNumber";
import CModal from "../../../../components/modals/CModal";
import InfoButton from "../../../../components/ui/InfoButton";

type PartialCollectionType = Pick<CollectionType, "category" | "weight" | "name" | "id"> & {
  defaultTypeCollection?: Pick<DefaultCollection, "id"> | null;
};

type PartialEvaluation = Pick<DefaultEvaluation, "__typename" | "id" | "rating"> & {
  collection: Pick<DefaultCollection, "id">;
};

type GradeSuggestionViewProps = CViewProps & {
  skillsMean: number;
  behaviourMean: number;
  collectionTypes: PartialCollectionType[];
  otherEvaluations: PartialEvaluation[];
};

export default function GradeSuggestionView({ skillsMean, behaviourMean, collectionTypes, otherEvaluations, ...rest }: GradeSuggestionViewProps) {
  const { t } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [gradeSuggestionSkillsWeight, setGradeSuggestionSkillWeight] = useState(0.5);
  const classParticipationGrade = skillsMean * gradeSuggestionSkillsWeight + behaviourMean * (1 - gradeSuggestionSkillsWeight);
  let weightSum = 0;
  let weightedRating = 0;
  collectionTypes.forEach((colType) => {
    if (colType.category === "CLASS_PARTICIPATION") {
      weightSum += colType.weight;
      weightedRating += classParticipationGrade * colType.weight;
    } else if (colType.defaultTypeCollection != null) {
      const collEvaluation = otherEvaluations.find((ev) => ev.collection.id === colType.defaultTypeCollection!.id);
      if (collEvaluation?.rating) {
        weightSum += colType.weight;
        weightedRating += colType.weight * collEvaluation.rating;
      }
    }
  });
  const gradeSuggestion = weightedRating / weightSum;
  return (
    <>
      <CModal isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} closeButton={false} placement="bottom">
        <CView
          style={{
            gap: 20,
            height: 400,
            justifyContent: "center",
            width: "100%",
            padding: "md",
          }}
        >
          <CView style={{ flexDirection: "row", justifyContent: "space-between", flex: 1 }}>
            <CText style={{ flex: 0.6, fontSize: "md", fontWeight: "300" }}>
              {t("modify-class-participation-weights", "Muokkaa taitojen ja työskentelyn painoarvoja")}
            </CText>
            <CButton
              title={t("default-settings", "Oletusasetukset")}
              size="small"
              variant="outline"
              colorScheme="darkgray"
              style={{ flex: 0.4, height: 40 }}
              onPress={() => setGradeSuggestionSkillWeight(0.5)}
            />
          </CView>
          <CView style={{ justifyContent: "center", alignItems: "stretch", gap: 5 }}>
            <CView style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
              <CView style={{ justifyContent: "center", alignItems: "center", gap: 3 }}>
                <CText style={{ fontSize: "sm", fontWeight: "500" }}>{t("skills-weight", "Taitojen paino")}</CText>
                <CText style={{ fontSize: "md", fontWeight: "500" }}>{gradeSuggestionSkillsWeight.toFixed(2)}</CText>
              </CView>
              <CView style={{ justifyContent: "center", alignItems: "center", gap: 3 }}>
                <CText style={{ fontSize: "sm", fontWeight: "500" }}>{t("behaviour-weight", "Työskentelyn paino")}</CText>
                <CText style={{ fontSize: "md", fontWeight: "500" }}>{(1 - gradeSuggestionSkillsWeight).toFixed(2)}</CText>
              </CView>
            </CView>
            <Slider
              minimumTrackTintColor={COLORS.primary}
              maximumTrackTintColor={COLORS.secondary}
              value={gradeSuggestionSkillsWeight}
              step={0.01}
              onValueChange={(value) => setGradeSuggestionSkillWeight(value[0])}
            />
            <CView style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
              <CText style={{ fontSize: "sm", fontWeight: "500" }}>
                {t("weighted-mean-skills-and-behaviour", "Taitojen ja työskentelyn painotettu keskiarvo:")}
              </CText>
              <CText style={{ fontSize: "md", fontWeight: "500" }}>{gradeSuggestion.toFixed(2)}</CText>
            </CView>
          </CView>
          <CView style={{ justifyContent: "center", alignItems: "center" }}>
            <CircledNumber borderColor="darkgray" borderWidth={2} value={gradeSuggestion} decimals={0} />
          </CView>
          <CButton title={t("use", "Käytä")} onPress={() => setIsMenuOpen(false)} />
        </CView>
      </CModal>
      <CView {...rest} style={{ gap: 10, ...rest?.style }}>
        <CView style={{ gap: 5 }}>
          <CView style={{ flexDirection: "row", gap: "md", justifyContent: "flex-start", alignItems: "center" }}>
            <CText style={{ fontSize: "lg", fontWeight: "300" }}>{t("grade-suggestion", "Arvosanaehdotus")}</CText>
            <InfoButton
              onPress={() => {
                Alert.alert(
                  t("grade-suggestion", "Arvosanaehdotus"),
                  t(
                    "grade-suggestion-info",
                    "Arvosanaehdotus on laskettu painottamalla valittuja arviointisisältöjä ryhmälle asetettujen painojen mukaisesti. Painoja pääset tarkastelemaan ja muokkaamaan Ryhmä-sivulta."
                  )
                );
              }}
            />
          </CView>
          <CView style={{ flexDirection: "row" }}>
            <CButton
              size="small"
              variant="outline"
              title={t("edit", "Muokkaa")}
              colorScheme="darkgray"
              style={{ width: "auto" }}
              leftIcon={<MaterialCommunityIcon name="filter-variant" size={25} color={COLORS.darkgray} />}
              rightIcon={
                gradeSuggestionSkillsWeight !== 0.5 ? (
                  <CView style={{ width: 10, height: 10, borderRadius: 5, backgroundColor: "primary" }} />
                ) : undefined
              }
              onPress={() => setIsMenuOpen(true)}
            />
          </CView>
        </CView>
        <CView style={{ justifyContent: "center", alignItems: "center" }}>
          <CircledNumber borderColor="darkgray" borderWidth={2} value={gradeSuggestion} decimals={0} />
        </CView>
      </CView>
    </>
  );
}
