import { NativeStackScreenProps } from "@react-navigation/native-stack";
import CButton from "../../../components/primitives/CButton";
import CTextInput from "../../../components/primitives/CTextInput";
import CView from "../../../components/primitives/CView";
import { nameValidator } from "../../../helpers/textValidation";
import { FONT_SIZES } from "../../../theme";
import { HomeStackParamList } from "../types";

type GroupViewProps = NativeStackScreenProps<HomeStackParamList, "GroupCreation">;

export default function GroupCreation({ navigation, route }: GroupViewProps) {
  const onCreated = route.params?.onCreated;

  return (
    <CView style={{ flex: 1, margin: 15 }}>
      <CTextInput placeholder="Ryhmän nimi" title="Ryhmän nimi" textValidation={nameValidator} />
      <CButton title="Luo" onPress={onCreated || navigation.goBack} style={{ height: 36, paddingHorizontal: 25 }} />
    </CView>
  );
}
