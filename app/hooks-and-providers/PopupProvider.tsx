import React, { createContext, useMemo, useState } from "react";
import { SlideInDown, SlideInUp, SlideOutDown, SlideOutUp, ZoomIn, ZoomOut } from "react-native-reanimated";
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";
import CAnimatedView from "../components/primitives/CAnimatedView";
import CButton from "../components/primitives/CButton";
import CText from "../components/primitives/CText";
import CView from "../components/primitives/CView";
import { COLORS, SPACING } from "../theme";
import { CViewStyle } from "../theme/types";

type OpenPopupProps = {
  closeTimeout?: number;
  placement?: "top" | "bottom" | "center";
  type?: "success" | "error";
};

type PopupContextType = {
  openPopup: (content: string, props?: OpenPopupProps) => void;
  closePopup: () => void;
};

const PopupContext = createContext<PopupContextType | null>(null);

const { Provider } = PopupContext;

export const usePopup = () => {
  const context = React.useContext(PopupContext);
  if (!context) {
    throw new Error("usePopup must be used within an PopupProvider");
  }
  return context;
};

const DEFAULT_CLOSE_TIMEOUT_MS = 5000;

export default function PopupProvider({ children }: React.PropsWithChildren) {
  const [popupProps, setPopupProps] = useState<OpenPopupProps | null>(null);
  const [popupContent, setPopupContent] = useState<string | null>(null);
  const closeTimer = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  const openPopup = (content: string, props?: OpenPopupProps) => {
    setPopupContent(content);
    setPopupProps(props || null);
    closeTimer.current = setTimeout(() => {
      closePopup();
    }, props?.closeTimeout || DEFAULT_CLOSE_TIMEOUT_MS);
  };

  const closePopup = () => {
    setPopupContent(null);
    setPopupProps(null);
    if (closeTimer.current) clearInterval(closeTimer.current);
  };

  const placement = popupProps?.placement || "top";
  const type = popupProps?.type || "success";

  const outerViewStyles: CViewStyle = useMemo(() => {
    let placementStyles: CViewStyle;
    switch (placement) {
      case "top":
        placementStyles = { justifyContent: "flex-start", top: "xl" };
        break;
      case "bottom":
        placementStyles = { justifyContent: "flex-end", bottom: "xl" };
        break;
      default:
        placementStyles = { justifyContent: "center" };
        break;
    }
    return placementStyles;
  }, [placement]);

  const exitAnimation = useMemo(() => {
    switch (placement) {
      case "top":
        return SlideOutUp;
      case "bottom":
        return SlideOutDown;
      default:
        return ZoomOut;
    }
  }, [placement]);

  const enterAnimation = useMemo(() => {
    switch (placement) {
      case "top":
        return SlideInUp;
      case "bottom":
        return SlideInDown;
      default:
        return ZoomIn;
    }
  }, [placement]);

  return (
    <Provider
      value={{
        openPopup,
        closePopup,
      }}
    >
      {children}
      {popupContent && (
        <CView style={{ position: "absolute", top: 0, left: "md", right: "md", bottom: 0, ...outerViewStyles }}>
          <CAnimatedView
            entering={enterAnimation}
            exiting={exitAnimation}
            style={{
              flexDirection: "row",
              alignItems: "center",
              width: "100%",
              backgroundColor: type === "success" ? "light-green" : "error",
              padding: "lg",
              borderRadius: 5,
            }}
          >
            <MaterialCommunityIcon
              name={type === "success" ? "check" : "exclamation"}
              size={25}
              color={COLORS.white}
              style={{ marginRight: SPACING.md }}
            />
            <CText style={{ color: "white", flex: 1, marginRight: "2xl" }}>{popupContent}</CText>
            <CButton variant="empty" onPress={closePopup} style={{ position: "absolute", right: "lg", top: 0 }}>
              <MaterialCommunityIcon name="close" size={20} color={COLORS.white} />
            </CButton>
          </CAnimatedView>
        </CView>
      )}
      {/* <CModal
        isOpen={!!popupContent}
        onClose={closePopup}
        placement="bottom"
        closeOnBackgroundPress={false}
        outerViewStyles={{
          backgroundColor: "transparent",
        }}
        innerViewStyles={{
          backgroundColor: "light-green",
        }}
      >
        <CText style={{ color: "white" }}>{popupContent}</CText>
      </CModal> */}
    </Provider>
  );
}
