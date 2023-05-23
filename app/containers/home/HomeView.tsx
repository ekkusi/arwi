import { useQuery } from "@apollo/client";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { FlatList } from "react-native";
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";
import CButton from "../../components/primitives/CButton";
import GroupListItem from "../../components/GroupListItem";
import LoadingIndicator from "../../components/LoadingIndicator";
import ShadowButton from "../../components/primitives/ShadowButton";
import { graphql } from "../../gql";
import { GroupListItemFragment } from "../../gql/graphql";
import { COLORS, FONT_SIZES } from "../../theme";
import { HomeStackParamList } from "./types";
import CView from "../../components/primitives/CView";
import CText from "../../components/primitives/CText";

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

type HomeViewProps = NativeStackScreenProps<HomeStackParamList, "Home">;

export default function HomePage({ navigation }: HomeViewProps) {
  const { data, loading } = useQuery(MainPage_GetCurrentUser_Query);

  if (loading || !data) return <LoadingIndicator />;

  const { getCurrentUser: teacher } = data;

  const renderListItem = ({ item }: { item: GroupListItemFragment }) => (
    <GroupListItem
      group={item}
      onEvaluateIconPress={() => console.log("open evaluate")}
      onListItemPress={() => navigation.navigate("GroupView", { groupId: item.id })}
    />
  );
  return (
    <CView style={{ flex: 1, marginHorizontal: 10, marginTop: 20 }}>
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
          <CText style={{ fontSize: "md" }}>Sinulla ei ole ryhmiä</CText>
          <CButton title="Luo ensimmäinen ryhmä" onPress={() => navigation.navigate("GroupCreation")} />
        </CView>
      )}
      <ShadowButton
        style={{ position: "absolute", bottom: 20, right: 15 }}
        title="Luo uusi ryhmä"
        onPress={() => navigation.navigate("GroupCreation")}
      >
        <MaterialCommunityIcon name="plus" size={30} color={COLORS.white} />
      </ShadowButton>
    </CView>
  );
}
