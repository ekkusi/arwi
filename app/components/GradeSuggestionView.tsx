import { useState } from "react";
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";
import { useTranslation } from "react-i18next";
import { Slider } from "@miblanchard/react-native-slider";
import { COLORS } from "../theme";
import CButton from "./primitives/CButton";
import CText from "./primitives/CText";
import CView, { CViewProps } from "./primitives/CView";
import CircledNumber from "./CircledNumber";
import CModal from "./CModal";

type GradeSuggestionViewProps = CViewProps & {
  skillsMean: number;
  behaviourMean: number;
};

export default function GradeSuggestionView({ skillsMean, behaviourMean, ...rest }: GradeSuggestionViewProps) {
  const { t } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [gradeSuggestionSkillsWeight, setGradeSuggestionSkillWeight] = useState(0.5);
  const gradeSuggestion = skillsMean * gradeSuggestionSkillsWeight + behaviourMean * (1 - gradeSuggestionSkillsWeight);

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
          <CView style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <CText style={{ fontSize: "lg", fontWeight: "500" }}>{t("modify-weights", "Muokkaa painoja")}</CText>
            <CButton
              title={t("default-settings", "Oletusasetukset")}
              size="small"
              variant="outline"
              colorScheme="darkgray"
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
        <CView style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
          <CText style={{ fontSize: "lg", fontWeight: "400" }}>{t("grade-suggestion", "Arvosanaehdotus")}</CText>
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
        <CView style={{ justifyContent: "center", alignItems: "center" }}>
          <CircledNumber borderColor="darkgray" borderWidth={2} value={gradeSuggestion} decimals={0} />
        </CView>
      </CView>
    </>
  );
}
