import React, { ReactElement, createContext, useState } from "react";
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
  type?: "success" | "error" | "warning";
};

type ToastActionProps = {
  action: () => void;
  label: string;
};

type ToastContent = string | ReactElement | ((closeToast: () => void) => ReactElement);

type ToastMessage = {
  content: ToastContent;
  id: number;
  props: OpenToastProps;
  actionProps?: ToastActionProps;
  timeoutRef: ReturnType<typeof setTimeout>;
};

type ToastContextType = {
  openToast: (content: ToastContent, props?: OpenToastProps, actionProps?: ToastActionProps) => () => void;
  closeAllToasts: () => void;
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

let toastId = 0;

export default function ToastProvider({ children }: React.PropsWithChildren) {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const { t } = useTranslation();

  const openToast = (content: ToastContent, props?: OpenToastProps, actionProps?: ToastActionProps): (() => void) => {
    toastId += 1;
    const id = toastId; // Increment id for each new toast
    const newToast: ToastMessage = {
      content,
      id,
      props: props || { type: "success", placement: "bottom" },
      actionProps,
      timeoutRef: setTimeout(() => closeToast(id), props?.closeTimeout || DEFAULT_CLOSE_TIMEOUT_MS),
    };
    setToasts((currentToasts) => [...currentToasts, newToast]);

    // Return a function that allows closing this specific toast without needing the id externally
    return () => {
      closeToast(id);
    };
  };

  const closeToast = (id: number) => {
    setToasts((currentToasts) => {
      // Find the toast to clear its timeout before filtering it out
      const toastToClose = currentToasts.find((toast) => toast.id === id);
      if (toastToClose) {
        clearTimeout(toastToClose.timeoutRef);
      }
      return currentToasts.filter((toast) => toast.id !== id);
    });
  };

  const closeAllToasts = () => {
    setToasts((currentToasts) => {
      currentToasts.forEach((toast) => {
        if (toast.timeoutRef) {
          clearTimeout(toast.timeoutRef);
        }
      });
      return [];
    });
  };

  const handleActionPress = (toast: ToastMessage) => {
    toast.actionProps?.action();
    closeToast(toast.id);
  };

  const getToastAnimations = (placement: OpenToastProps["placement"]) => {
    const exitAnimation = placement === "top" ? SlideOutUp : SlideOutDown;
    const enterAnimation = placement === "top" ? SlideInUp : SlideInDown;

    return { exiting: exitAnimation, entering: enterAnimation };
  };

  const getToastStyles = (toastProps: OpenToastProps) => {
    const { placement, type } = toastProps;

    let styles: CViewStyle;

    switch (type) {
      case "error":
        styles = { backgroundColor: "error" };
        break;
      case "warning":
        styles = { backgroundColor: "yellow" };
        break;
      default:
        styles = { backgroundColor: "green" };
    }

    switch (placement) {
      case "top":
        styles = { top: Platform.OS === "ios" ? "4xl" : "2xl", ...styles };
        break;
      default:
        styles = { bottom: Platform.OS === "ios" ? "2xl" : "xl", ...styles }; // iOS bottom part of screen tends to be more rounded so tooltip has to be a little big higher
        break;
    }
    return styles;
  };

  const getToastActionButtonColor = (type: OpenToastProps["type"]) => {
    switch (type) {
      case "error":
        return "error";
      case "warning":
        return "yellow";
      default:
        return "darkgreen";
    }
  };

  const getToastIcon = (type: OpenToastProps["type"]) => {
    switch (type) {
      case "success":
        return "check";
      default:
        return "exclamation";
    }
  };

  const renderContent = (toast: ToastMessage) => {
    if (typeof toast.content === "string") {
      return <CText style={{ color: "white", flex: 1, marginRight: "2xl" }}>{toast.content}</CText>;
    }
    if (typeof toast.content === "function") {
      return toast.content(() => closeToast(toast.id));
    }
    return toast.content;
  };

  return (
    <Provider
      value={{
        openToast,
        closeAllToasts,
      }}
    >
      {children}
      {/* Wrapper View is needed to make exit animation work in iOS */}
      <CView
        style={{
          position: "absolute",
          bottom: 0,
          right: 0,
          left: 0,
          top: 0,
          justifyContent: "flex-end",
          gap: "lg",
          paddingHorizontal: "md",
        }}
        pointerEvents="box-none"
      >
        {toasts
          .map((toast) => (
            <CAnimatedView
              key={toast.id}
              style={{
                alignItems: "center",
                padding: "lg",
                borderRadius: 10,
                ...getToastStyles(toast.props),
              }}
              {...getToastAnimations(toast.props.placement)}
            >
              <CView
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <MaterialCommunityIcon name={getToastIcon(toast.props.type)} size={25} color={COLORS.white} style={{ marginRight: SPACING.md }} />
                {renderContent(toast)}
                <CButton variant="empty" onPress={() => closeToast(toast.id)} style={{ position: "absolute", right: "sm" }}>
                  <MaterialCommunityIcon name="close" size={20} color={COLORS.white} />
                </CButton>
              </CView>
              {toast.actionProps && (
                <CButton
                  size="small"
                  variant="outline"
                  colorScheme={getToastActionButtonColor(toast.props.type)}
                  title={toast.actionProps.label || t("ok", "OK")}
                  onPress={() => handleActionPress(toast)}
                  style={{ borderWidth: 2, marginTop: "md" }}
                />
              )}
            </CAnimatedView>
          ))
          .reverse()}
      </CView>
    </Provider>
  );
}
