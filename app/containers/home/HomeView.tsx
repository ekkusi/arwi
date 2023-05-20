import { useQuery } from "@apollo/client";
import { NativeStackNavigationProp, NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { FlatList, Text, View } from "react-native";
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";
import CustomButton from "../../components/CustomButton";
import GroupListItem from "../../components/GroupListItem";
import LoadingIndicator from "../../components/LoadingIndicator";
import ShadowButton from "../../components/ShadowButton";
import { graphql } from "../../gql";
import { GroupListItemFragment } from "../../gql/graphql";
import { COLORS, FONT_SIZES } from "../../theme";
import { HomeStackParamList } from "./types";

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
const onGroupListItemPress = (group: GroupListItemFragment, navigation: NativeStackNavigationProp<HomeStackParamList, "Home", undefined>) => {
  navigation.navigate("GroupView", { groupId: group.id });
};

const createGroupButton = (action: () => void) => (
  <CustomButton
    title="Luo"
    onPress={action}
    buttonStyle={{ height: 36, paddingHorizontal: 25 }}
    buttonColor={COLORS.green}
    titleColor={COLORS.white}
  />
);
const openGroupCreation = (navigation: NativeStackNavigationProp<HomeStackParamList, "Home", undefined>) => {
  // TODO: SAVE GROUP
  console.log("Save group");
  navigation.navigate("GroupCreation", { createGroupButton: () => createGroupButton(navigation.goBack) });
};

export default function HomePage({ navigation }: HomeViewProps) {
  const { data, loading } = useQuery(MainPage_GetCurrentUser_Query);

  if (loading || !data) return <LoadingIndicator />;

  const { getCurrentUser: teacher } = data;

  const renderListItem = ({ item }: { item: GroupListItemFragment }) => (
    <GroupListItem
      group={item}
      onEvaluateIconPress={() => console.log("open evaluate")}
      onListItemPress={() => onGroupListItemPress(item, navigation)}
    />
  );
  return (
    <View style={{ flex: 1, marginHorizontal: 10, marginTop: 20 }}>
      {teacher.groups.length > 0 ? (
        <FlatList
          data={teacher.groups.sort((a, b) => {
            return a.updatedAt < b.updatedAt ? 1 : -1;
          })}
          renderItem={renderListItem}
          keyExtractor={(group) => group.id}
        />
      ) : (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <Text style={{ fontSize: FONT_SIZES.medium }}>Sinulla ei ole ryhmiä</Text>
          <CustomButton
            title="Luo ensimmäinen ryhmä"
            onPress={() => openGroupCreation(navigation)}
            buttonColor={COLORS.green}
            titleColor={COLORS.white}
          />
        </View>
      )}
      <ShadowButton
        buttonStyle={{ position: "absolute", bottom: 20, right: 15 }}
        title="Luo uusi ryhmä"
        buttonColor={COLORS.green}
        titleColor={COLORS.white}
        onPress={() => openGroupCreation(navigation)}
      >
        <MaterialCommunityIcon name="plus" size={30} color={COLORS.white} />
      </ShadowButton>
    </View>
  );
}
