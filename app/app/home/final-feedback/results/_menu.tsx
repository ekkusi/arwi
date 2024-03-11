import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useTranslation } from "react-i18next";
import { MenuOption } from "react-native-popup-menu";
import ViewMenuBase from "@/components/common/ViewMenuBase";
import CText from "@/components/primitives/CText";
import { HomeStackParams } from "../../types";

export type FinalFeedbackResultsMenuProps = NativeStackScreenProps<HomeStackParams, "final-feedback-results">;

export default function FinalFeedbackResultsMenu({ route, navigation }: FinalFeedbackResultsMenuProps) {
  const { groupId } = route.params;
  const { t } = useTranslation();

  return (
    <ViewMenuBase>
      <MenuOption onSelect={() => navigation.push("final-feedback", { groupId, noRedirect: true })}>
        <CText>{t("generate-again", "Generoi uudelleen")}</CText>
      </MenuOption>
    </ViewMenuBase>
  );
}
