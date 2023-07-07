import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { getClassYearInfos } from "arwi-backend/src/utils/subjectUtils";
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";
import CustomSelectionInput from "../../../../components/CustomSelectionInput";
import CButton from "../../../../components/primitives/CButton";
import CText from "../../../../components/primitives/CText";
import CTextInput from "../../../../components/primitives/CTextInput";
import CView from "../../../../components/primitives/CView";
import ProgressBar from "../../../../components/ProgressBar";
import { nameValidator } from "../../../../helpers/textValidation";
import { COLORS } from "../../../../theme";
import { useGroupCreationContext } from "./GroupCreationProvider";
import { GroupCreationStackParams } from "./types";

export default function GroupNameSelectionView({ navigation }: NativeStackScreenProps<GroupCreationStackParams, "index">) {
  const classes = getClassYearInfos();
  const { group, setGroup } = useGroupCreationContext();
  return (
    <CView style={{ flex: 1 }}>
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
          onPress={() => navigation.push("subject")}
        >
          <MaterialCommunityIcon name="arrow-right" size={25} color={COLORS.white} />
        </CButton>
      </CView>
      <ProgressBar style={{ position: "absolute", bottom: 0 }} color={COLORS.primary} progress={1 / 3} />
    </CView>
  );
}
