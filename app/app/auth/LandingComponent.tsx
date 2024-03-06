import { useCallback } from "react";
import { Platform } from "react-native";
import { Easing, useSharedValue, withTiming } from "react-native-reanimated";
import { useTranslation } from "react-i18next";
import Constants from "expo-constants";
import { useKeyboardListener } from "../../hooks-and-providers/keyboard";
import { COLORS } from "../../theme";
import Layout from "../../components/layout/Layout";
import CView from "../../components/primitives/CView";
import CText from "../../components/primitives/CText";

const BORDER_RADIUS = 70;

const STATUS_BAR_HEIGHT = Constants.statusBarHeight;

export default function LandingComponent({
  children,
  headerSize = "small",
  headerPlacement = "bottom",
  notWrappedChildren,
  title,
}: React.PropsWithChildren<{
  headerSize?: "big" | "small";
  headerPlacement?: "top" | "bottom";
  notWrappedChildren?: JSX.Element;
  title?: string;
}>) {
  const topMargin = useSharedValue(0);
  const { t } = useTranslation();

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
    <Layout
      avoidKeyboard={false}
      style={{
        backgroundColor: "white",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: headerPlacement === "bottom" ? "column-reverse" : "column",
      }}
    >
      {notWrappedChildren}
      <CView
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          borderBottomLeftRadius: headerPlacement === "top" ? BORDER_RADIUS : 0,
          borderTopRightRadius: headerPlacement === "bottom" ? BORDER_RADIUS : 0,
          backgroundColor: COLORS.green,
          width: "100%",
        }}
      >
        <CText style={{ color: "white", fontSize: "5xl", fontFamily: "Aileron-Thin", marginTop: "-4xl" }}>arwi</CText>
        <CText style={{ color: "white", fontFamily: "Aileron-Thin", marginTop: "-lg" }}>
          {t("LandingPage.betterEvaluation", "Laadukkaampaa arviointia").toLocaleUpperCase()}
        </CText>
        {/* </CView> */}
      </CView>
      <CView
        style={{
          flex: headerSize === "big" ? 1 : 2,
          alignItems: "center",
          width: "100%",
          justifyContent: "center",
          backgroundColor: "white",
          paddingTop: Platform.OS === "ios" ? STATUS_BAR_HEIGHT + 7 : STATUS_BAR_HEIGHT - 20,
        }}
      >
        {headerPlacement === "top" ? (
          <>
            <CView
              style={{ position: "absolute", top: 0, right: 0, width: BORDER_RADIUS * 2, height: BORDER_RADIUS * 2, backgroundColor: "green" }}
            />
            <CView
              style={{
                position: "absolute",
                top: 0,
                right: 0,
                width: BORDER_RADIUS * 2,
                height: BORDER_RADIUS * 2,
                backgroundColor: "white",
                borderTopRightRadius: headerPlacement === "top" ? BORDER_RADIUS : 0,
              }}
            />
          </>
        ) : (
          <>
            <CView
              style={{ position: "absolute", bottom: 0, left: 0, width: BORDER_RADIUS * 2, height: BORDER_RADIUS * 2, backgroundColor: "green" }}
            />
            <CView
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                width: BORDER_RADIUS * 2,
                height: BORDER_RADIUS * 2,
                backgroundColor: "white",
                borderBottomLeftRadius: headerPlacement === "bottom" ? BORDER_RADIUS : 0,
              }}
            />
          </>
        )}

        {title && <CText style={{ fontSize: "xl", marginBottom: "2xl", textAlign: "center" }}>{title}</CText>}
        {children}
      </CView>
    </Layout>
  );
}
