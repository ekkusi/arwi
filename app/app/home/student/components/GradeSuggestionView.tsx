import { useState } from "react";
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";
import { useTranslation } from "react-i18next";
import { Slider } from "@miblanchard/react-native-slider";
import { Alert } from "react-native";
import { calculateGradeSuggestion } from "arwi-shared";
import { COLORS } from "../../../../theme";
import CButton from "../../../../components/primitives/CButton";
import CText from "../../../../components/primitives/CText";
import CView, { CViewProps } from "../../../../components/primitives/CView";
import CircledNumber from "../../../../components/ui/CircledNumber";
import CModal from "../../../../components/modals/CModal";
import InfoButton from "../../../../components/ui/InfoButton";
import { FragmentOf, graphql, readFragment } from "@/graphql";

export const GradeSuggestionView_CollectionType_Fragment = graphql(`
  fragment GradeSuggestionView_CollectionType on CollectionType {
    category
    weight
    name
    id
    defaultTypeCollection {
      id
      evaluations {
        id
        rating
      }
    }
  }
`);

export const GradeSuggestionView_DefaultEvaluation_Fragment = graphql(`
  fragment GradeSuggestionView_DefaultEvaluation on DefaultEvaluation {
    rating
    collection {
      id
      type {
        id
        weight
      }
    }
  }
`);

type GradeSuggestionViewProps = CViewProps & {
  skillsMean: number;
  behaviourMean: number;
  collectionTypes: FragmentOf<typeof GradeSuggestionView_CollectionType_Fragment>[];
  defaultTypeEvaluations: FragmentOf<typeof GradeSuggestionView_DefaultEvaluation_Fragment>[];
  size?: "large" | "small";
  hideEdit?: boolean;
};

export default function GradeSuggestionView({
  skillsMean,
  behaviourMean,
  collectionTypes: collectionTypeFragments,
  defaultTypeEvaluations: defaultTypeEvaluationFragments,
  size = "large",
  hideEdit = false,
  ...rest
}: GradeSuggestionViewProps) {
  const { t } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [gradeSuggestionSkillsWeight, setGradeSuggestionSkillWeight] = useState(0.5);

  const collectionTypes = readFragment(GradeSuggestionView_CollectionType_Fragment, collectionTypeFragments);
  const defaultEvaluations = readFragment(GradeSuggestionView_DefaultEvaluation_Fragment, defaultTypeEvaluationFragments);

  const gradeSuggestion = calculateGradeSuggestion(skillsMean, behaviourMean, collectionTypes, defaultEvaluations, {
    skillsWeight: gradeSuggestionSkillsWeight,
    behaviourWeight: 1 - gradeSuggestionSkillsWeight,
  });

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
            <CText style={{ fontSize: size === "large" ? "lg" : "sm2", fontWeight: "300" }}>{t("grade-suggestion", "Arvosanaehdotus")}</CText>
            <InfoButton
              size={size === "large" ? 36 : 28}
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
        </CView>
        {!hideEdit && (
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
        )}
        <CView style={{ justifyContent: "center", alignItems: "center" }}>
          <CircledNumber size={size === "large" ? 70 : 60} borderColor="darkgray" borderWidth={2} value={gradeSuggestion} decimals={0} />
        </CView>
      </CView>
    </>
  );
}
