import { useState } from "react";
import { Menu, MenuOption, MenuOptions, MenuTrigger, renderers } from "react-native-popup-menu";
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";
import { useTranslation } from "react-i18next";
import { Slider } from "@miblanchard/react-native-slider";
import { COLORS } from "../theme";
import CButton from "./primitives/CButton";
import CText from "./primitives/CText";
import CView from "./primitives/CView";
import CircledNumber from "./CircledNumber";

export default function GradeSuggestionView({ skillsMean, behaviourMean }: { skillsMean: number; behaviourMean: number }) {
  const { t } = useTranslation();
  const [gradeSuggestionSkillsWeight, setGradeSuggestionSkillWeight] = useState(0.5);
  const gradeSuggestion = skillsMean * gradeSuggestionSkillsWeight + behaviourMean * (1 - gradeSuggestionSkillsWeight);

  return (
    <CView style={{ gap: 10 }}>
      <CView style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
        <CText style={{ fontSize: "md", fontWeight: "300" }}>{t("grade-suggestion", "Arvosanaehdotus")}</CText>
        <Menu renderer={renderers.SlideInMenu}>
          <MenuTrigger>
            <CButton
              size="small"
              variant="outline"
              title={t("edit", "Muokkaa")}
              colorScheme="darkgray"
              style={{ width: "auto" }}
              leftIcon={<MaterialCommunityIcon name="chevron-down" size={25} color={COLORS.darkgray} />}
              rightIcon={
                gradeSuggestionSkillsWeight !== 0.5 ? (
                  <CView style={{ width: 10, height: 10, borderRadius: 5, backgroundColor: "primary" }} />
                ) : undefined
              }
              disableTouchEvent
            />
          </MenuTrigger>
          <MenuOptions>
            <CView
              style={{
                gap: 20,
                height: 400,
                justifyContent: "center",
                width: "100%",
                padding: "md",
                borderTopColor: "gray",
                borderTopWidth: 1,
              }}
            >
              <CView style={{ flexDirection: "row", justifyContent: "space-between" }}>
                <CText style={{ fontSize: "lg", fontWeight: "500" }}>{t("modify-weights", "Muokkaa painoja")}</CText>
                <CButton
                  title={t("default-settings", "Oletus asetukset")}
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
              <MenuOption onSelect={() => {}}>
                <CButton disableTouchEvent title={t("use", "Käytä")} />
              </MenuOption>
            </CView>
          </MenuOptions>
        </Menu>
      </CView>
      <CView style={{ justifyContent: "center", alignItems: "center" }}>
        <CircledNumber borderColor="darkgray" borderWidth={2} value={gradeSuggestion} decimals={0} />
      </CView>
    </CView>
  );
}
