import { useTranslation } from "react-i18next";
import React, { useEffect, useState } from "react";
import Animated, { Easing, useAnimatedScrollHandler, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { Keyboard } from "react-native";
import { GroupOverviewPage_GetGroupQuery } from "../../../gql/graphql";
import CView from "../../../components/primitives/CView";
import CText from "../../../components/primitives/CText";
import { SPACING } from "../../../theme";
import { GroupNavigationProps } from "./types";
import Card from "../../../components/Card";
import CTouchableOpacity from "../../../components/primitives/CTouchableOpacity";
import SearchBar from "../../../components/SearchBar";

export default function StudentList({ getGroup: group, navigation }: GroupOverviewPage_GetGroupQuery & GroupNavigationProps) {
  const { t } = useTranslation();

  const translateY = useSharedValue(0);
  const isScrolling = useSharedValue(false);
  const lastContentOffset = useSharedValue(0);

  const [searchOpen, setSearchOpen] = useState(false);
  const flatlistOffsetY = useSharedValue(0);

  useEffect(() => {
    flatlistOffsetY.value = searchOpen ? 48 : 0;
  }, [flatlistOffsetY, searchOpen]);

  const flatlistStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: withTiming(flatlistOffsetY.value, {
            duration: 300,
            easing: Easing.inOut(Easing.ease),
          }),
        },
      ],
    };
  });

  const searchBarStyle = useAnimatedStyle(() => {
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
        if (!searchOpen) {
          translateY.value = -100;
        }
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

  const [searchText, setSearchText] = useState("");
  const filteredStudents = group.currentModule.students.filter((student) => student.name.includes(searchText));

  const renderItem = ({ item }: { item: (typeof filteredStudents)[0] }) => {
    const presentClasses = item.currentModuleEvaluations.reduce((prevVal, evaluation) => (evaluation.wasPresent ? prevVal + 1 : prevVal), 0);
    const allClasses = group.currentModule.evaluationCollections.length;
    return (
      <Card style={{ marginBottom: "md" }} key={item.id}>
        <CTouchableOpacity onPress={() => navigation.navigate("student", { id: item.id, name: item.name, archived: group.archived })}>
          <CText style={{ fontSize: "md", fontWeight: "500" }}>{item.name}</CText>
          <CView style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
            <CText style={{ fontSize: "sm", color: "gray" }}>
              {t("present", "Paikalla")} {presentClasses}/{allClasses}
            </CText>
          </CView>
        </CTouchableOpacity>
      </Card>
    );
  };

  return (
    <CView style={{ flex: 1 }}>
      {group.currentModule.students.length > 0 ? (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} style={{ height: "100%" }}>
          <Animated.View style={[{ flex: 1 }, flatlistStyle]}>
            <Animated.FlatList
              onScroll={scrollHandler}
              contentContainerStyle={{ paddingTop: SPACING.md * 2, paddingBottom: 50, paddingHorizontal: SPACING.md }}
              showsVerticalScrollIndicator={false}
              data={filteredStudents}
              renderItem={renderItem}
            />
          </Animated.View>
          <Animated.View
            pointerEvents="box-none"
            style={[{ position: "absolute", width: "100%", paddingTop: SPACING.md, paddingHorizontal: SPACING.md }, searchBarStyle]}
          >
            <SearchBar
              searchText={searchText}
              onChangeSearchState={(open) => {
                setSearchOpen(open);
              }}
              setSearchText={(text) => setSearchText(text)}
            />
          </Animated.View>
        </TouchableWithoutFeedback>
      ) : (
        <CView style={{ height: 300, justifyContent: "center", alignItems: "center" }}>
          <CText style={{ width: "60%" }}>{t("group.no-students", "Ryhmässä ei ole oppilaita")}</CText>
        </CView>
      )}
    </CView>
  );
}
