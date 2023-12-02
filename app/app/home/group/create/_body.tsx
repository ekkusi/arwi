import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useCallback, useEffect, useMemo } from "react";
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";
import { useTranslation } from "react-i18next";
import { Alert, Keyboard, Platform, ScrollView, TouchableWithoutFeedback } from "react-native";
import { KeyboardStickyView } from "react-native-keyboard-controller";
import CButton, { CButtonProps } from "../../../../components/primitives/CButton";
import CView from "../../../../components/primitives/CView";
import { COLORS } from "../../../../theme";
import { GroupCreationStackParams } from "./types";
import ProgressBar from "../../../../components/ProgressBar";
import { CViewStyle } from "../../../../theme/types";
import { useIsKeyboardVisible } from "../../../../hooks-and-providers/keyboard";
import Layout from "../../../../components/Layout";
import CScrollView from "../../../../components/primitives/CScrollView";
import { CKeyboardAvoidingViewProps } from "../../../../components/primitives/CKeyboardAvoidingView";
import CKeyboardStickyView from "../../../../components/primitives/CKeyboardStickyView";

type GroupCreationBodyProps = Omit<CKeyboardAvoidingViewProps, "avoidKeyboard"> & {
  navigation: NativeStackNavigationProp<
    GroupCreationStackParams,
    | "group-create-general-info"
    | "group-create-students"
    | "group-create-subject"
    | "group-create-collection-types"
    | "group-create-collection-type-weights",
    "home-stack"
  >;
  progressState: number;
  noBackButton?: boolean;
  noForwardButton?: boolean;
  forwardButtonProps?: Omit<CButtonProps, "onPress" | "variant">;
  moveForwardDisabled?: boolean;
  onMoveBack?: () => void;
  onMoveForward?: () => void;
  hideBottomBarOnKeyboardOpen?: boolean;
  closeKeyBoardOnTap?: boolean;
};

export default function GroupCreationBody({
  navigation,
  progressState,
  style,
  children,
  noBackButton,
  noForwardButton,
  forwardButtonProps,
  moveForwardDisabled,
  onMoveBack,
  onMoveForward,
  hideBottomBarOnKeyboardOpen = Platform.OS === "android",
  ...rest
}: GroupCreationBodyProps) {
  const { t } = useTranslation();

  const isKeyboardVisible = useIsKeyboardVisible();

  // useSoftInputHeightChanged(({ softInputHeight }) => {
  //   console.log(softInputHeight.toString());

  //   // buttonContainerPaddingValue.value = withTiming(60);
  //   // scrollContainerPaddingValue.value = withTiming(softInputHeight > 0 ? 84 : 0);
  //   buttonContainerPaddingValue.value = withTiming(softInputHeight > 0 ? 100 : 0);
  // });

  const backAction = useCallback(() => {
    Alert.alert("", t("GroupCreationStack.cancelPopUpMessage", "Oletko varma, että haluat perua ryhmän luonnin?"), [
      {
        text: t("Dialog.no", "Ei"),
        onPress: () => null,
        style: "cancel",
      },
      { text: t("Dialog.yes", "Kyllä"), onPress: () => navigation.getParent("home-stack")?.navigate("home") },
    ]);
    return true;
  }, [navigation, t]);

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => <CView />,
      headerRight: () => (
        <CButton variant="empty" onPress={backAction} leftIcon={<MaterialCommunityIcon name="close" size={30} color={COLORS.white} />} />
      ),
    });
  }, [backAction, navigation, t]);

  const handleMoveBack = () => {
    if (onMoveBack) {
      onMoveBack();
      return;
    }
    navigation.goBack();
  };

  const handleMoveForward = () => {
    if (onMoveForward) {
      onMoveForward();
      return;
    }
    switch (progressState) {
      case 1:
        navigation.navigate("group-create-general-info");
        break;
      case 2:
        navigation.navigate("group-create-collection-types");
        break;
      case 3:
        navigation.navigate("group-create-collection-type-weights");
        break;
      case 4:
        navigation.navigate("group-create-students");
        break;
      default:
        break;
    }
  };

  const buttonSpacing = useMemo(() => {
    if (noBackButton) return "flex-end";
    if (noForwardButton) return "flex-start";
    return "space-between";
  }, [noBackButton, noForwardButton]);

  const showBottomBar = isKeyboardVisible ? !hideBottomBarOnKeyboardOpen : true;
  // const showBottomBar = true;

  return (
    <Layout style={{ backgroundColor: "white" }} avoidKeyboard={false}>
      {/* <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}> */}
      <CView style={{ flex: 1 }}>
        <CView style={{ flexGrow: 1, paddingTop: "2xl", paddingHorizontal: "md", ...style }}>{children}</CView>
        <CKeyboardStickyView style={{ flexDirection: "row", justifyContent: buttonSpacing, padding: "xl" }}>
          {!noBackButton && (
            <CButton onPress={handleMoveBack}>
              <MaterialCommunityIcon name="arrow-left" size={25} color={COLORS.white} />
            </CButton>
          )}
          {!noForwardButton && (
            <CButton
              disabled={moveForwardDisabled}
              onPress={handleMoveForward}
              leftIcon={<MaterialCommunityIcon name="arrow-right" size={25} color={COLORS.white} />}
              {...forwardButtonProps}
            />
          )}
        </CKeyboardStickyView>
        <ProgressBar
          color={COLORS.primary}
          progress={progressState / 5}
          style={{ position: "absolute", bottom: 0, left: 0, right: 0, width: "100%" }}
        />
      </CView>
      {/* </TouchableWithoutFeedback> */}
    </Layout>
  );
}
