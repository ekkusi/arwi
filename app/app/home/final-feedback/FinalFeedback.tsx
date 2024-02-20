import { NativeStackScreenProps } from "@react-navigation/native-stack";
import CText from "../../../components/primitives/CText";
import CView from "../../../components/primitives/CView";
import { HomeStackParams } from "../types";

export default function FinalFeedback({ route, navigation }: NativeStackScreenProps<HomeStackParams, "final-feedback-collection">) {
  const { groupId } = route.params;
  return (
    <CView>
      <CText>Loppupalaute koko ryhmälle</CText>
    </CView>
  );
}
