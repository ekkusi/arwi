import { useQuery } from "@apollo/client";
import React from "react";
import { FlatList } from "react-native";
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";
import { useTranslation } from "react-i18next";
import { Stack, useRouter } from "expo-router";
import CButton from "../../../components/primitives/CButton";
import GroupListItem from "../../../components/GroupListItem";
import LoadingIndicator from "../../../components/LoadingIndicator";
import ShadowButton from "../../../components/primitives/ShadowButton";
import { graphql } from "../../../gql";
import { GroupListItemFragment } from "../../../gql/graphql";
import { COLORS, FONT_SIZES } from "../../../theme";
import CView from "../../../components/primitives/CView";
import CText from "../../../components/primitives/CText";
import { defaultHeaderStyles } from "../_layout";

const MainPage_GetCurrentUser_Query = graphql(`
  query MainPage_GetCurrentUser {
    getCurrentUser {
      email
      id
      groups {
        id
        name
        updatedAt
        subject {
          label
          code
        }
      }
    }
  }
`);

// export default function HomePage() {
//   const { data, loading } = useQuery(MainPage_GetCurrentUser_Query);
//   const { t } = useTranslation();
//   const router = useRouter();
//   console.log("HomePage");

//   if (loading || !data) return <LoadingIndicator />;

//   const { getCurrentUser: teacher } = data;

//   console.log("teacher", teacher);

//   const renderListItem = ({ item }: { item: GroupListItemFragment }) => (
//     <GroupListItem group={item} onEvaluateIconPress={() => console.log("open evaluate")} onListItemPress={() => router.push(`/group/${item.id}`)} />
//   );
//   return (
//     <CView style={{ flex: 1, marginHorizontal: 10, marginTop: 20 }}>
//       {teacher.groups.length > 0 ? (
//         <FlatList
//           data={[...teacher.groups].sort((a, b) => {
//             return a.updatedAt < b.updatedAt ? 1 : -1;
//           })}
//           renderItem={renderListItem}
//           keyExtractor={(group) => group.id}
//         />
//       ) : (
//         <CView style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
//           <CText style={{ fontSize: "md" }}>{t("home-view.no-groups", "Sinulla ei ole ryhmiä")}</CText>
//           <CButton title={t("home-view.create-group", "Luo ensimmäinen ryhmä")} onPress={() => router.push("/group/create")} />
//         </CView>
//       )}
//       <ShadowButton
//         style={{ position: "absolute", bottom: 20, right: 15 }}
//         title={t("home-view.create-group", "Luo ryhmä")}
//         onPress={() => router.push("/group/create")}
//       >
//         <MaterialCommunityIcon name="plus" size={30} color={COLORS.white} />
//       </ShadowButton>
//     </CView>
//   );
// }

export default function HomeView() {
  console.log("HomeView (home)");

  return (
    <CView style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <CText>Tyylit</CText>
    </CView>
  );
}
