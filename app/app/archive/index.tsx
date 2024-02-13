import React, { useMemo } from "react";
import { useQuery } from "@apollo/client";
import { useTranslation } from "react-i18next";
import { NativeStackNavigationProp, NativeStackScreenProps } from "@react-navigation/native-stack";
import { SlideInLeft, SlideOutRight } from "react-native-reanimated";
import { FlatList } from "react-native";
import { CollectionTypeCategory } from "arwi-backend/src/types";
import { graphql } from "../../gql";
import CView from "../../components/primitives/CView";
import CText from "../../components/primitives/CText";
import GroupListItem from "../../components/GroupListItem";
import { ArchivePage_GetCurrentUserQuery, MainPage_GetCurrentUserQuery } from "../../gql/graphql";
import LoadingIndicator from "../../components/LoadingIndicator";
import { HomeStackParams } from "../home/types";
import Layout from "../../components/Layout";

const ArchivePage_GetCurrentUser_Query = graphql(`
  query ArchivePage_GetCurrentUser {
    getCurrentUser {
      email
      id
      groups {
        id
        name
        archived
        updatedAt
        subject {
          label {
            fi
          }
          code
        }
        currentModule {
          id
        }
      }
    }
  }
`);

function ArchivePageContent({
  data,
  navigation,
}: {
  data: ArchivePage_GetCurrentUserQuery;
  navigation: NativeStackNavigationProp<HomeStackParams, "archive">;
}) {
  const { t } = useTranslation();

  const { getCurrentUser: teacher } = data;

  const archivedGroups = useMemo(() => {
    return teacher.groups.filter((group) => group.archived);
  }, [teacher.groups]);

  const sortedGroups = useMemo(() => {
    return [...archivedGroups].sort((a, b) => {
      return a.updatedAt < b.updatedAt ? 1 : -1;
    });
  }, [archivedGroups]);

  return (
    <Layout style={{ paddingHorizontal: "sm" }}>
      {sortedGroups.length > 0 ? (
        <FlatList
          contentContainerStyle={{ paddingTop: 10 }}
          showsVerticalScrollIndicator={false}
          data={sortedGroups}
          renderItem={({ item }) => (
            <GroupListItem
              enterAnimation={SlideInLeft}
              exitAnimation={SlideOutRight}
              group={item}
              onEvaluateIconPress={() => navigation.navigate("collection-create", { groupId: item.id })}
              onListItemPress={() =>
                navigation.navigate("group", { id: item.id, classYearId: item.currentModule.id, name: item.name, archived: item.archived })
              }
            />
          )}
          keyExtractor={(group) => group.id}
        />
      ) : (
        <CView style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <CText style={{ fontSize: "md" }}>{t("no-archived-groups", "Ei arkisoituja ryhmiä")}</CText>
        </CView>
      )}
    </Layout>
  );
}
export default function ArchivePage({ navigation }: NativeStackScreenProps<HomeStackParams, "archive">) {
  const { data, loading } = useQuery(ArchivePage_GetCurrentUser_Query);

  if (loading || !data) return <LoadingIndicator />;

  return <ArchivePageContent data={data} navigation={navigation} />;
}
