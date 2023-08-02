import { useCallback } from "react";
import { Platform } from "react-native";
import Animated, { Easing, useSharedValue, withTiming } from "react-native-reanimated";
import { useKeyboardListener } from "../hooks-and-providers/keyboardHooks";
import { COLORS } from "../theme";
import Layout from "./Layout";
import CView from "./primitives/CView";

export default function LandingComponent({ bottomChildren, topChildren }: { bottomChildren?: JSX.Element; topChildren?: JSX.Element }) {
  const topMargin = useSharedValue(0);

  // Only animate on ios as android keyboard is toggling is instant
  const onShowKeyboard = useCallback(() => {
    topMargin.value = Platform.OS === "ios" ? withTiming(-150, { easing: Easing.out(Easing.ease) }) : -150;
  }, [topMargin]);

  const onHideKeyboard = useCallback(() => {
    topMargin.value = Platform.OS === "ios" ? withTiming(0, { easing: Easing.out(Easing.ease) }) : 0;
  }, [topMargin]);

  useKeyboardListener({
    onShow: onShowKeyboard,
    onHide: onHideKeyboard,
  });

  return (
    // <Animated.View
    //   style={[{ position: "absolute", height, width, backgroundColor: "white", justifyContent: "center", alignItems: "center", bottom: 0 }]}
    // >
    //   <KeyboardAvoidingView behavior="padding" style={{ width: "100%", flexDirection: "column", flex: 1 }} keyboardVerticalOffset={100}>
    <Layout
      style={{
        backgroundColor: "white",
        position: "absolute",
        // height,
        // width,
        width: "100%",
        top: 0,
        right: 0,
        left: 0,
        justifyContent: "center",
        alignItems: "center",
        bottom: 0,
      }}
    >
      <Animated.View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          gap: 20,
          borderBottomLeftRadius: 100,
          backgroundColor: COLORS.green,
          width: "100%",
          marginTop: topMargin,
        }}
      >
        {topChildren}
      </Animated.View>
      <CView style={{ flex: 1, alignItems: "center", width: "100%", justifyContent: "center", gap: 10, backgroundColor: "white" }}>
        {/* <CKeyboardAvoidingView behavior="padding" style={{ width: "100%", flex: 1 }}> */}
        <CView style={{ position: "absolute", top: 0, right: 0, width: 100, height: 100, backgroundColor: "green" }} />
        <CView style={{ position: "absolute", top: 0, right: 0, width: 100, height: 100, backgroundColor: "white", borderTopRightRadius: 100 }} />
        {bottomChildren}
        {/* </CKeyboardAvoidingView> */}
      </CView>
    </Layout>
    //   </KeyboardAvoidingView>
    // </Animated.View>
  );
}
