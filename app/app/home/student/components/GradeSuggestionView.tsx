import { useState } from "react";
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";
import { useTranslation } from "react-i18next";
import { Slider } from "@miblanchard/react-native-slider";
import { calculateGradeSuggestion } from "arwi-shared";
import { COLORS } from "../../../../theme";
import CButton from "../../../../components/primitives/CButton";
import CText from "../../../../components/primitives/CText";
import CView, { CViewProps } from "../../../../components/primitives/CView";
import CircledNumber from "../../../../components/ui/CircledNumber";
import CModal from "../../../../components/modals/CModal";
import InfoButton from "../../../../components/ui/InfoButton";
import { useModal } from "../../../../hooks-and-providers/ModalProvider";
import { FragmentOf, graphql, readFragment } from "@/graphql";

const ALPHABETS = "ABCDEFGHIJKLMNOPQRSTUVWYXZ";
const APPROX_SIGN = "\u2248";

const getAlphabet = (i: number) => {
  if (i >= 0 && i < ALPHABETS.length) {
    return ALPHABETS[i];
  }
  return "";
};

export const GradeSuggestionView_DefaultEvaluation_Fragment = graphql(`
  fragment GradeSuggestionView_DefaultEvaluation on DefaultEvaluation {
    id
    rating
    collection {
      id
      type {
        id
        weight
        name
      }
    }
  }
`);

type GradeSuggestionViewProps = CViewProps & {
  skillsMean: number;
  behaviourMean: number;
  classParticipationWeight: number;
  defaultTypeEvaluations: FragmentOf<typeof GradeSuggestionView_DefaultEvaluation_Fragment>[];
  size?: "large" | "small";
  hideEdit?: boolean;
  infoButtonLinkAction?: () => void;
};

export default function GradeSuggestionView({
  skillsMean,
  behaviourMean,
  classParticipationWeight,
  defaultTypeEvaluations: defaultTypeEvaluationFragments,
  size = "large",
  hideEdit = false,
  infoButtonLinkAction,
  ...rest
}: GradeSuggestionViewProps) {
  const { t } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { openModal, closeModal } = useModal();
  const [gradeSuggestionSkillsWeight, setGradeSuggestionSkillWeight] = useState(0.5);

  const defaultEvaluations = readFragment(GradeSuggestionView_DefaultEvaluation_Fragment, defaultTypeEvaluationFragments);

  const gradeSuggestion = calculateGradeSuggestion(skillsMean, behaviourMean, classParticipationWeight, defaultEvaluations, {
    skillsWeight: gradeSuggestionSkillsWeight,
    behaviourWeight: 1 - gradeSuggestionSkillsWeight,
  });

  const constOpenGradeSuggestionInfoView = () => {
    openModal({
      title: t("grade-suggestion", "Arvosanaehdotus"),
      children: (
        <CView style={{ gap: 15 }}>
          <CText style={{ fontSize: "sm2", fontWeight: "300" }}>
            {t(
              "grade-suggestion-info",
              "Arvosanaehdotus lasketaan painotettuna summana ryhmän arviointisisällöille asetettujen painojen mukaisesti:"
            )}
          </CText>
          <CView style={{ gap: -3 }}>
            <CView style={{ flexDirection: "row", justifyContent: "space-between" }}>
              <CText style={{ fontSize: "sm2", fontWeight: "300" }}>
                <CText style={{ fontSize: "md", fontWeight: "500" }}>A</CText>
                <CText style={{ fontSize: "sm", fontWeight: "500" }}>1</CText>: {t("class-participation", "Tuntityöskentely")},{" "}
                {t("skills", "taidot").toLocaleLowerCase()}
              </CText>
              <CText style={{ fontSize: "md", fontWeight: "500" }}>{Number.isNaN(skillsMean) ? "-" : Math.round(10 * skillsMean) / 10}</CText>
            </CView>
            <CView style={{ flexDirection: "row", justifyContent: "space-between" }}>
              <CText style={{ fontSize: "sm2", fontWeight: "300" }}>
                <CText style={{ fontSize: "md", fontWeight: "500" }}>A</CText>
                <CText style={{ fontSize: "sm", fontWeight: "500" }}>2</CText>: {t("class-participation", "Tuntityöskentely")},{" "}
                {t("behaviour", "työskentely").toLocaleLowerCase()}
              </CText>
              <CText style={{ fontSize: "md", fontWeight: "500" }}>{Number.isNaN(behaviourMean) ? "-" : Math.round(10 * behaviourMean) / 10}</CText>
            </CView>
            {defaultEvaluations.map((evaluation, i) => (
              <CView key={evaluation.id} style={{ flexDirection: "row", justifyContent: "space-between" }}>
                <CText style={{ fontSize: "sm2", fontWeight: "300" }}>
                  <CText style={{ fontSize: "md", fontWeight: "500" }}>{getAlphabet(i + 1)}</CText>: {evaluation.collection.type.name}
                </CText>
                <CText style={{ fontSize: "md", fontWeight: "500" }}>{Number.isNaN(evaluation.rating) ? "-" : evaluation.rating}</CText>
              </CView>
            ))}
          </CView>
          <CView style={{ justifyContent: "center" }}>
            <CText style={{ fontSize: "md", fontWeight: "500" }}>
              {(gradeSuggestionSkillsWeight * classParticipationWeight) / 100}A<CText style={{ fontSize: "sm", fontWeight: "500" }}>1</CText> +{" "}
              {((1 - gradeSuggestionSkillsWeight) * classParticipationWeight) / 100}A<CText style={{ fontSize: "sm", fontWeight: "500" }}>2</CText>
              {defaultEvaluations.map((evaluation, i) => (
                <CText key={evaluation.id} style={{ fontSize: "md", fontWeight: "500" }}>
                  {" "}
                  + {evaluation.collection.type.weight / 100}
                  {getAlphabet(i + 1)}
                </CText>
              ))}{" "}
              = {Number.isNaN(gradeSuggestion) ? "-" : Math.round(100 * gradeSuggestion) / 100}
            </CText>
          </CView>
          <CView style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", gap: 5 }}>
            <CText style={{ fontSize: "xl", fontWeight: "300" }}>{APPROX_SIGN}</CText>
            <CircledNumber value={Math.round(gradeSuggestion)} size={46} decimals={0} />
          </CView>
          {infoButtonLinkAction && (
            <CButton
              title="Muokkaa painoarvoja"
              onPress={() => {
                closeModal();
                infoButtonLinkAction();
              }}
            />
          )}
        </CView>
      ),
    });
  };

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
                constOpenGradeSuggestionInfoView();
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
