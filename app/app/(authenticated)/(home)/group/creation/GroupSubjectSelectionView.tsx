import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Subject } from "arwi-backend/src/types";
import { getSubjects, SubjectMinimal } from "arwi-backend/src/utils/subjectUtils";
import { useRouter } from "expo-router";
import { FlatList } from "react-native";
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";
import CustomSelectionInput from "../../../../../components/CustomSelectionInput";
import CButton from "../../../../../components/primitives/CButton";
import CText from "../../../../../components/primitives/CText";
import CTextInput from "../../../../../components/primitives/CTextInput";
import CView from "../../../../../components/primitives/CView";
import { subjectToIcon } from "../../../../../helpers/dataMappers";
import { nameValidator } from "../../../../../helpers/textValidation";
import { COLORS } from "../../../../../theme";
import { GroupCreationStackParams } from "./types";

type GroupViewProps = NativeStackScreenProps<GroupCreationStackParams, "GroupSubjectSelectionView">;

const renderSubjectItem = ({ item }: { item: SubjectMinimal }) => (
  <CButton title={item.label} variant="outline" colorScheme="gray" style={{ margin: 5 }}>
    {subjectToIcon(item)}
  </CButton>
);
export default function GroupSubjectSelectionView({ navigation, route }: GroupViewProps) {
  const router = useRouter();
  const subjects = getSubjects();
  return (
    <CView style={{ flex: 1, padding: 15, alignItems: "center", justifyContent: "center", gap: 30, backgroundColor: "white" }}>
      <CView style={{ height: 300, width: "100%" }}>
        <CText style={{ color: "darkgray", fontSize: "title" }}>Valitse oppiaine</CText>
        <FlatList data={subjects} renderItem={renderSubjectItem} keyExtractor={(subject) => subject.code} numColumns={3} />
      </CView>
      <CButton style={{ position: "absolute", bottom: 20, right: 20 }} onPress={() => router.push("GroupStudentCreationView")}>
        <MaterialCommunityIcon name="arrow-right" size={25} color={COLORS.white} />
      </CButton>
    </CView>
  );
}
