import React, { createContext, useMemo, useState } from "react";
import { Platform } from "react-native";
import { SlideInDown, SlideInUp, SlideOutDown, SlideOutUp, ZoomIn, ZoomOut } from "react-native-reanimated";
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";
import CAnimatedView from "../components/primitives/CAnimatedView";
import CButton from "../components/primitives/CButton";
import CText from "../components/primitives/CText";
import CView from "../components/primitives/CView";
import { COLORS, SPACING } from "../theme";
import { CViewStyle } from "../theme/types";

type OpenToastProps = {
  closeTimeout?: number;
  placement?: "top" | "bottom" | "center";
  type?: "success" | "error";
};

type ToastContextType = {
  openToast: (content: string, props?: OpenToastProps) => void;
  closeToast: () => void;
};

const ToastContext = createContext<ToastContextType | null>(null);

const { Provider } = ToastContext;

export const useToast = () => {
  const context = React.useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within an ToastProvider");
  }
  return context;
};

const DEFAULT_CLOSE_TIMEOUT_MS = 5000;

export default function ToastProvider({ children }: React.PropsWithChildren) {
  const [toastProps, setToastProps] = useState<OpenToastProps | null>(null);
  const [toastContent, setToastContent] = useState<string | null>(null);
  const closeTimer = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  const openToast = (content: string, props?: OpenToastProps) => {
    setToastContent(content);
    setToastProps(props || null);
    closeTimer.current = setTimeout(() => {
      closeToast();
    }, props?.closeTimeout || DEFAULT_CLOSE_TIMEOUT_MS);
  };

  const closeToast = () => {
    setToastContent(null);
    setToastProps(null);
    if (closeTimer.current) clearInterval(closeTimer.current);
  };

  const placement = toastProps?.placement || "bottom";
  const type = toastProps?.type || "success";

  const outerViewStyles: CViewStyle = useMemo(() => {
    let placementStyles: CViewStyle;
    switch (placement) {
      case "top":
        placementStyles = { justifyContent: "flex-start", top: "xl" };
        break;
      case "bottom":
        placementStyles = { justifyContent: "flex-end", bottom: Platform.OS === "ios" ? "2xl" : "xl" }; // iOS bottom part of screen tends to be more rounded so tooltip has to be a little big higher
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
        openToast,
        closeToast,
      }}
    >
      {children}
      {toastContent && (
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
              borderRadius: 10,
            }}
          >
            <MaterialCommunityIcon
              name={type === "success" ? "check" : "exclamation"}
              size={25}
              color={COLORS.white}
              style={{ marginRight: SPACING.md }}
            />
            <CText style={{ color: "white", flex: 1, marginRight: "2xl" }}>{toastContent}</CText>
            <CButton variant="empty" onPress={closeToast} style={{ position: "absolute", right: "lg", top: 0 }}>
              <MaterialCommunityIcon name="close" size={20} color={COLORS.white} />
            </CButton>
          </CAnimatedView>
        </CView>
      )}
    </Provider>
  );
}
