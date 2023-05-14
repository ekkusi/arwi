import { useQuery } from "@apollo/client";
import { NativeStackNavigationProp, NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";
import CustomButton from "../../components/CustomButton";
import GroupListItem from "../../components/GroupListItem";
import LoadingIndicator from "../../components/LoadingIndicator";
import { graphql } from "../../gql";
import { Group, Teacher } from "../../mikanlelutyypit";
import { COLORS, FONT_SIZES } from "../../theme";
import { HomeStackParamList } from "./types";

const MainPage_GetTeacher_Query = graphql(`
  query MainPage_GetTeacher($teacherId: ID!) {
    getTeacher(id: $teacherId) {
      email
      id
      groups {
        id
        name
        subject {
          label
        }
      }
    }
  }
`);
//
// type MainPageProps = {
//  data: MainPage_GetTeacherQuery;
// };

type HomeViewProps = NativeStackScreenProps<HomeStackParamList, "Home">;
const onGroupListItemPress = (group: Group, navigation: NativeStackNavigationProp<HomeStackParamList, "Home", undefined>) => {
  navigation.navigate("GroupView", { group });
};

const openGroupCreation = (navigation: NativeStackNavigationProp<HomeStackParamList, "Home", undefined>) => {
  navigation.navigate("GroupCreation", {});
};

export default function HomePage({ navigation, route }: HomeViewProps) {
  const {teacher} = route.params
  const { data, loading } = useQuery(MainPage_GetTeacher_Query, {
    variables: {
      teacherId: "357d5bd3-e865-48ee-b96d-acf36834c481",
    },
  });

  if (loading || !data) return <LoadingIndicator />;

  if (!teacher) throw new Error("Unexpected error, no teacher");

  const renderListItem = ({ item }: { item: Group }) => <GroupListItem group={item} onListItemPress={() => onGroupListItemPress(item, navigation)} />;
  return (
    <View style={{ flex: 1, marginHorizontal: 10 }}>
      <View style={{ height: 80, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
        <Text style={{ fontSize: FONT_SIZES.large }}>Omat ryhmät:</Text>
        <TouchableOpacity style={{ width: 40, height: 40 }}>
          <MaterialCommunityIcon name="plus-thick" size={40} color={COLORS.green} />
        </TouchableOpacity>
      </View>
      {teacher.groups.length > 0 ? (
        <FlatList data={teacher.groups} renderItem={renderListItem} keyExtractor={(group) => group.id} />
      ) : (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <Text style={{ fontSize: FONT_SIZES.medium }}>Sinulla ei ole ryhmiä</Text>
          <CustomButton
            title="Luo ensimmäinen ryhmä"
            onPress={() => openGroupCreation(navigation)}
            buttonColor={COLORS.green}
            titleColor={COLORS.white}
            disabled={false}
          />
        </View>
      )}
    </View>
  );
};
