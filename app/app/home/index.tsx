import React from "react";
import { useQuery } from "@apollo/client";
import { useTranslation } from "react-i18next";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { FlatList } from "react-native";
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";
import { graphql } from "../../gql";
import CView from "../../components/primitives/CView";
import CText from "../../components/primitives/CText";
import GroupListItem from "../../components/GroupListItem";
import { GroupListItemFragment } from "../../gql/graphql";
import LoadingIndicator from "../../components/LoadingIndicator";
import { HomeStackParams } from "./types";
import CButton from "../../components/primitives/CButton";
import ShadowButton from "../../components/primitives/ShadowButton";
import { COLORS } from "../../theme";

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

export default function HomePage({ navigation }: NativeStackScreenProps<HomeStackParams, "index">) {
  const { data, loading } = useQuery(MainPage_GetCurrentUser_Query);
  const { t } = useTranslation();

  if (loading || !data) return <LoadingIndicator />;

  const { getCurrentUser: teacher } = data;

  const renderListItem = ({ item }: { item: GroupListItemFragment }) => (
    <GroupListItem
      group={item}
      onEvaluateIconPress={() => navigation.navigate("collection-create", { groupId: item.id })}
      onListItemPress={() => navigation.navigate("group", item)}
    />
  );
  return (
    <CView style={{ flex: 1, paddingHorizontal: 10, paddingTop: 20 }}>
      {teacher.groups.length > 0 ? (
        <FlatList
          data={[...teacher.groups].sort((a, b) => {
            return a.updatedAt < b.updatedAt ? 1 : -1;
          })}
          renderItem={renderListItem}
          keyExtractor={(group) => group.id}
        />
      ) : (
        <CView style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <CText style={{ fontSize: "md" }}>{t("home-view.no-groups", "Sinulla ei ole ryhmiä")}</CText>
          <CButton title={t("home-view.create-group", "Luo ensimmäinen ryhmä")} onPress={() => navigation.navigate("group-create")} />
        </CView>
      )}
      <ShadowButton
        style={{ position: "absolute", bottom: 20, right: 15 }}
        title={t("home-view.create-group", "Luo ryhmä")}
        onPress={() => navigation.navigate("group-create")}
        leftIcon={<MaterialCommunityIcon name="plus" size={30} color={COLORS.white} />}
      />
    </CView>
  );
}
