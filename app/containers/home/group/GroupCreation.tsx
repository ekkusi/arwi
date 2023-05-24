import { NativeStackScreenProps } from "@react-navigation/native-stack";
import CButton from "../../../components/primitives/CButton";
import CTextInput from "../../../components/primitives/CTextInput";
import CustomSelectionInput from "../../../components/CustomSelectionInput";
import CView from "../../../components/primitives/CView";
import { nameValidator } from "../../../helpers/textValidation";
import { COLORS, FONT_SIZES } from "../../../theme";
import { HomeStackParamList } from "../types";

type GroupViewProps = NativeStackScreenProps<HomeStackParamList, "GroupCreation">;

type Class = {
  name: string;
};

const classes: Class[] = [
  { name: "1. luokka" },
  { name: "2. luokka" },
  { name: "3. luokka" },
  { name: "4. luokka" },
  { name: "5. luokka" },
  { name: "6. luokka" },
  { name: "7. luokka" },
  { name: "8. luokka" },
  { name: "9. luokka" },
];
export default function GroupCreation({ navigation, route }: GroupViewProps) {
  const onCreated = route.params?.onCreated;

  return (
    <CView style={{ flex: 1, margin: 15 }}>
      <CTextInput placeholder="Ryhmän nimi" title="Ryhmän nimi" textValidation={nameValidator} />
      <CButton title="Luo" onPress={onCreated || navigation.goBack} style={{ height: 36, paddingHorizontal: 25 }} />
      <CustomSelectionInput title="Luokka-aste" options={classes.map((obj) => obj.name)} />
    </CView>
  );
}
