import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { getClassYearInfos } from "arwi-backend/src/utils/subjectUtils";
import { useRouter } from "expo-router";
import { useContext } from "react";
import { KeyboardAvoidingView } from "react-native";
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";
import CustomSelectionInput from "../../../../../components/CustomSelectionInput";
import CButton from "../../../../../components/primitives/CButton";
import CText from "../../../../../components/primitives/CText";
import CTextInput from "../../../../../components/primitives/CTextInput";
import CView from "../../../../../components/primitives/CView";
import { nameValidator } from "../../../../../helpers/textValidation";
import { COLORS } from "../../../../../theme";
import { GroupCreationContext } from "./_layout";

export default function GroupNameSelectionView() {
  const router = useRouter();
  const classes = getClassYearInfos();
  const { group, setGroup } = useContext(GroupCreationContext);
  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior="height">
      <CView style={{ flex: 1, padding: 15, alignItems: "center", justifyContent: "center", gap: 30, backgroundColor: "white" }}>
        <CView style={{ width: "100%" }}>
          <CText style={{ fontSize: "title", fontWeight: "300", color: "darkgray" }}>Ryhmän nimi</CText>
          <CTextInput
            style={{ width: "100%" }}
            placeholder="Ryhmän nimi"
            title=""
            value={group.name}
            onChange={(event) => setGroup({ ...group, name: event.nativeEvent.text })}
            textValidation={nameValidator}
          />
        </CView>
        <CView style={{ width: "100%" }}>
          <CText style={{ fontSize: "title", fontWeight: "300", color: "darkgray" }}>Luokka-aste</CText>
          <CustomSelectionInput
            style={{ width: "100%" }}
            title=""
            options={classes.map((obj) => obj.label)}
            onSelect={(item) => {
              const selectedClass = classes.find((obj) => obj.label === item);
              setGroup({ ...group, class: selectedClass });
            }}
          />
        </CView>
        <CButton
          disabled={group.name.length === 0 || group.class === undefined}
          style={{ position: "absolute", bottom: 20, right: 20 }}
          onPress={() => router.push("/group/create/subject")}
        >
          <MaterialCommunityIcon name="arrow-right" size={25} color={COLORS.white} />
        </CButton>
      </CView>
    </KeyboardAvoidingView>
  );
}
