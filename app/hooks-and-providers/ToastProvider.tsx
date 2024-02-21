import React, { ReactElement, createContext, useMemo, useState } from "react";
import { Platform } from "react-native";
import { SlideInDown, SlideInUp, SlideOutDown, SlideOutUp } from "react-native-reanimated";
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";
import { useTranslation } from "react-i18next";
import CAnimatedView from "../components/primitives/CAnimatedView";
import CButton from "../components/primitives/CButton";
import CText from "../components/primitives/CText";
import CView from "../components/primitives/CView";
import { COLORS, SPACING } from "../theme";
import { CViewStyle } from "../theme/types";

type OpenToastProps = {
  closeTimeout?: number;
  placement?: "top" | "bottom";
  type?: "success" | "error";
};

type ToastActionProps = {
  action: () => void;
  label: string;
};

type ToastContextType = {
  openToast: (content: string, props?: OpenToastProps, actionProps?: ToastActionProps) => void;
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
  const [toastContent, setToastContent] = useState<string | ReactElement | null>(null);
  const [toastActionProps, setToastActionProps] = useState<ToastActionProps | null>(null);
  const closeTimer = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  const { t } = useTranslation();

  const openToast = (content: string | ReactElement, props?: OpenToastProps, actionProps?: ToastActionProps) => {
    setToastContent(content);
    setToastProps(props || {});
    setToastActionProps(actionProps || null);
    closeTimer.current = setTimeout(() => {
      closeToast();
    }, props?.closeTimeout || DEFAULT_CLOSE_TIMEOUT_MS);
  };

  const closeToast = () => {
    setToastContent(null);
    setToastProps(null);
    setToastActionProps(null);
    if (closeTimer.current) clearInterval(closeTimer.current);
  };

  const handleActionPress = () => {
    toastActionProps?.action();
    closeToast();
  };

  const placement = toastProps?.placement || "bottom";
  const type = toastProps?.type || "success";

  const placementStyles: CViewStyle = useMemo(() => {
    let styles: CViewStyle;
    switch (placement) {
      case "top":
        styles = { top: Platform.OS === "ios" ? "4xl" : "2xl" };
        break;
      default:
        styles = { bottom: Platform.OS === "ios" ? "2xl" : "xl" }; // iOS bottom part of screen tends to be more rounded so tooltip has to be a little big higher
        break;
    }
    return styles;
  }, [placement]);

  const exitAnimation = useMemo(() => {
    switch (placement) {
      case "top":
        return SlideOutUp;
      default:
        return SlideOutDown;
    }
  }, [placement]);

  const enterAnimation = useMemo(() => {
    switch (placement) {
      case "top":
        return SlideInUp;
      default:
        return SlideInDown;
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
      {/* Wrapper View is needed to make exit animation work in iOS */}
      <CView style={{ position: "absolute", bottom: 0, right: 0, left: 0, top: 0 }} pointerEvents="box-none">
        {toastContent && toastProps && (
          <CAnimatedView
            entering={enterAnimation}
            exiting={exitAnimation}
            style={{
              position: "absolute",
              right: "md",
              left: "md",
              alignItems: "center",
              backgroundColor: type === "success" ? "green" : "error",
              padding: "lg",
              borderRadius: 10,
              ...placementStyles,
            }}
          >
            <CView
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <MaterialCommunityIcon
                name={type === "success" ? "check" : "exclamation"}
                size={25}
                color={COLORS.white}
                style={{ marginRight: SPACING.md }}
              />
              {typeof toastContent === "string" ? (
                <CText style={{ color: "white", flex: 1, marginRight: "2xl" }}>{toastContent}</CText>
              ) : (
                toastContent
              )}
              <CButton variant="empty" onPress={closeToast} style={{ position: "absolute", right: "sm", top: -10 }}>
                <MaterialCommunityIcon name="close" size={20} color={COLORS.white} />
              </CButton>
            </CView>
            {toastActionProps && (
              <CButton
                size="small"
                variant="outline"
                colorScheme={type === "success" ? "darkgreen" : "error"}
                title={toastActionProps.label || t("ok", "OK")}
                onPress={handleActionPress}
                style={{ borderWidth: 2, marginTop: "md" }}
              />
            )}
          </CAnimatedView>
        )}
      </CView>
    </Provider>
  );
}
