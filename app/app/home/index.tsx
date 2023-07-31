import React, { useEffect, useMemo, useRef } from "react";
import { useQuery } from "@apollo/client";
import { useTranslation } from "react-i18next";
import { NativeStackNavigationProp, NativeStackScreenProps } from "@react-navigation/native-stack";
import { FlatList, ScrollView } from "react-native";
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";
import Animated, {
  Easing,
  FadeIn,
  Layout,
  SlideInLeft,
  SlideOutRight,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { graphql } from "../../gql";
import CView from "../../components/primitives/CView";
import CText from "../../components/primitives/CText";
import GroupListItem from "../../components/GroupListItem";
import { GroupListItemFragment, MainPage_GetCurrentUserQuery } from "../../gql/graphql";
import LoadingIndicator from "../../components/LoadingIndicator";
import { HomeStackParams } from "./types";
import CButton from "../../components/primitives/CButton";
import { COLORS } from "../../theme";
import CFlatList from "../../components/primitives/CFlatList";

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

function HomePageContent({
  data,
  navigation,
}: {
  data: MainPage_GetCurrentUserQuery;
  navigation: NativeStackNavigationProp<HomeStackParams, "index">;
}) {
  const { t } = useTranslation();
  const firstRender = useRef(true);

  const { getCurrentUser: teacher } = data;

  useEffect(() => {
    firstRender.current = false;
  }, []);

  const translateY = useSharedValue(0);
  const isScrolling = useSharedValue(false);
  const lastContentOffset = useSharedValue(0);

  const newEvaluationButtonStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: withTiming(translateY.value, {
            duration: 300,
            easing: Easing.inOut(Easing.ease),
          }),
        },
      ],
    };
  });

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      if (lastContentOffset.value > event.contentOffset.y && isScrolling.value) {
        translateY.value = 0;
      } else if (lastContentOffset.value < event.contentOffset.y && isScrolling.value) {
        translateY.value = 100;
      }
      lastContentOffset.value = event.contentOffset.y;
    },
    onBeginDrag: (_) => {
      isScrolling.value = true;
    },
    onEndDrag: (_) => {
      isScrolling.value = false;
    },
  });

  const sortedGroups = useMemo(() => {
    return [...teacher.groups].sort((a, b) => {
      return a.updatedAt < b.updatedAt ? 1 : -1;
    });
  }, [teacher.groups]);

  return (
    <CView style={{ flex: 1, paddingHorizontal: "sm" }}>
      {teacher.groups.length > 0 ? (
        <Animated.FlatList
          onScroll={scrollHandler}
          contentContainerStyle={{ paddingTop: 10 }}
          showsVerticalScrollIndicator={false}
          data={sortedGroups}
          renderItem={({ item }) => (
            <GroupListItem
              enterAnimation={firstRender.current ? undefined : SlideInLeft}
              exitAnimation={SlideOutRight}
              group={item}
              onEvaluateIconPress={() => navigation.navigate("collection-create", { groupId: item.id })}
              onListItemPress={() => navigation.navigate("group", item)}
            />
          )}
          keyExtractor={(group) => group.id}
        />
      ) : (
        <CView style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <CText style={{ fontSize: "md" }}>{t("home-view.no-groups", "Sinulla ei ole ryhmiä")}</CText>
          <CButton title={t("home-view.create-group", "Luo ensimmäinen ryhmä")} onPress={() => navigation.navigate("group-create")} />
        </CView>
      )}
      <Animated.View style={[{ overflow: "visible", position: "absolute", bottom: 20, right: 15 }, newEvaluationButtonStyle]}>
        <CButton
          shadowed
          title={t("home-view.create-group", "Luo ryhmä")}
          onPress={() => navigation.navigate("group-create")}
          leftIcon={<MaterialCommunityIcon name="plus" size={30} color={COLORS.white} />}
        />
      </Animated.View>
    </CView>
  );
}
export default function HomePage({ navigation }: NativeStackScreenProps<HomeStackParams, "index">) {
  const { data, loading } = useQuery(MainPage_GetCurrentUser_Query);

  if (loading || !data) return <LoadingIndicator />;

  return <HomePageContent data={data} navigation={navigation} />;
}
