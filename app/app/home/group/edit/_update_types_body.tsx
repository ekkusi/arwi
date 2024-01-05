import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useCallback, useEffect, useMemo } from "react";
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";
import { useTranslation } from "react-i18next";
import { Alert, Keyboard, TouchableWithoutFeedback } from "react-native";
import CButton, { CButtonProps } from "../../../../components/primitives/CButton";
import CView from "../../../../components/primitives/CView";
import { COLORS } from "../../../../theme";
import ProgressBar from "../../../../components/ProgressBar";
import Layout from "../../../../components/Layout";
import { CKeyboardAvoidingViewProps } from "../../../../components/primitives/CKeyboardAvoidingView";
import { UpdateTypesStackParams } from "./update_type_stack_types";

type UpdateTypesBodyProps = Omit<CKeyboardAvoidingViewProps, "avoidKeyboard"> & {
  navigation: NativeStackNavigationProp<UpdateTypesStackParams, "group-edit-collection-types" | "group-edit-collection-types-weights", "home-stack">;
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

export const SCROLL_TO_INPUT_EXTRA_HEIGHT = 130;

export default function UpdateTypesBody({
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
  ...rest
}: UpdateTypesBodyProps) {
  const { t } = useTranslation();

  const backAction = useCallback(() => {
    navigation.getParent("home-stack")?.goBack();
  }, [navigation]);

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
        navigation.navigate("group-edit-collection-types-weights");
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

  return (
    <Layout {...rest} style={{ backgroundColor: "white" }} avoidKeyboard={false}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <CView style={{ flex: 1 }}>
          <CView style={{ flexGrow: 1, paddingTop: "2xl", paddingHorizontal: "md", ...style }}>{children}</CView>
          <CView style={{ flexDirection: "row", justifyContent: buttonSpacing, padding: "xl" }}>
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
          </CView>
          <ProgressBar
            color={COLORS.primary}
            progress={progressState / 2}
            style={{ position: "absolute", bottom: 0, left: 0, right: 0, width: "100%" }}
          />
        </CView>
      </TouchableWithoutFeedback>
    </Layout>
  );
}
