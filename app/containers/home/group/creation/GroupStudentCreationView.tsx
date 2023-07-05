import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Student, Subject } from "arwi-backend/src/types";
import { getSubjects, SubjectMinimal } from "arwi-backend/src/utils/subjectUtils";
import { FlatList } from "react-native";
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";
import CustomSelectionInput from "../../../../components/CustomSelectionInput";
import CButton from "../../../../components/primitives/CButton";
import CText from "../../../../components/primitives/CText";
import CTextInput from "../../../../components/primitives/CTextInput";
import CView from "../../../../components/primitives/CView";
import { subjectToIcon } from "../../../../helpers/dataMappers";
import { nameValidator } from "../../../../helpers/textValidation";
import { COLORS } from "../../../../theme";
import { GroupCreationStackParams } from "./types";

type GroupViewProps = NativeStackScreenProps<GroupCreationStackParams, "GroupStudentCreationView">;

const renderStudentItem = ({ item }: { item: string }) => (
  <CView>
    <CText style={{ fontSize: "md", fontWeight: "300", color: "darkgray" }}>{item}</CText>
  </CView>
);
export default function GroupSubjectSelectionView({ navigation, route }: GroupViewProps) {
  const { students } = route.params;
  return (
    <CView style={{ flex: 1, padding: 15, alignItems: "center", justifyContent: "center", gap: 30, backgroundColor: "white" }}>
      <CView style={{ height: 50 }}>
        <FlatList data={students} renderItem={renderStudentItem} keyExtractor={(_, index) => index.toString()} numColumns={1} />
      </CView>
      <CView style={{ height: 60, flexDirection: "row" }}>
        <CTextInput style={{ flex: 5 }} placeholder="Uusi oppilas"></CTextInput>
        <CButton style={{ flex: 1, position: "absolute", right: 20 }}>
          <MaterialCommunityIcon name="plus" color={COLORS.white} />
        </CButton>
      </CView>

      <CButton style={{ position: "absolute", bottom: 20, right: 20 }} onPress={() => navigation.navigate("GroupSubjectSelectionView", {})}>
        <MaterialCommunityIcon name="arrow-right" color={COLORS.white} />
      </CButton>
      <CButton
        title="Luo ryhmä"
        style={{ position: "absolute", bottom: 20, right: 20 }}
        onPress={() => navigation.navigate("GroupSubjectSelectionView", {})}
      >
        <MaterialCommunityIcon name="done" color={COLORS.white} />
      </CButton>
    </CView>
  );
}
