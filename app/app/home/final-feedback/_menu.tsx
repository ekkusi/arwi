import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useTranslation } from "react-i18next";
import { MenuOption } from "react-native-popup-menu";
import ViewMenuBase from "@/components/common/ViewMenuBase";
import CText from "@/components/primitives/CText";
import { HomeStackParams } from "../types";

export type FinalFeedbackMenuProps = NativeStackScreenProps<HomeStackParams, "final-feedback">;

export default function FinalFeedbackMenu({ route, navigation }: FinalFeedbackMenuProps) {
  const { groupId } = route.params;
  const { t } = useTranslation();

  return (
    <ViewMenuBase>
      <MenuOption onSelect={() => navigation.push("final-feedback", { groupId })}>
        <CText>{t("generate-again", "Generoi uudellleen")}</CText>
      </MenuOption>
    </ViewMenuBase>
  );
}
