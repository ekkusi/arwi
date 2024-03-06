import { useEffect, useMemo, useState } from "react";
import { Modal, ModalProps, StatusBar, TouchableWithoutFeedback } from "react-native";
import {
  BaseAnimationBuilder,
  FadeIn,
  FadeOut,
  runOnJS,
  SlideInDown,
  SlideInUp,
  SlideOutDown,
  SlideOutUp,
  ZoomIn,
  ZoomOut,
} from "react-native-reanimated";
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";
import Constants from "expo-constants";
import { hasNotch } from "react-native-device-info";
import { CViewStyle } from "../../theme/types";
import CAnimatedView from "../primitives/CAnimatedView";
import CButton from "../primitives/CButton";
import CText from "../primitives/CText";
import CView, { CViewProps } from "../primitives/CView";
import { blendColors, hexToRgbA, rgbaToString } from "../../helpers/color";
import { COLORS } from "../../theme";

export type CModalProps = Omit<ModalProps, "visible" | "onRequestClose"> & {
  isOpen: boolean;
  placement?: "top" | "bottom" | "center";
  outerViewStyles?: CViewStyle;
  innerViewStyles?: CViewStyle;
  headerStyles?: CViewStyle;
  title?: string | JSX.Element;
  closeButton?: boolean | JSX.Element;
  closeOnBackgroundPress?: boolean;
  animated?: boolean;
  onClose?: () => void;
  exitingAnimation?: typeof BaseAnimationBuilder;
  enteringAnimation?: typeof BaseAnimationBuilder;
  animationDuration?: number;
};

const outerViewStyle: CViewStyle = {
  position: "absolute",
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundColor: "rgba(0,0,0,0.6)",
  alignItems: "center",
};

const innerViewStyle: CViewStyle = {
  width: "100%",
  maxHeight: "80%",
  paddingHorizontal: "xl",
  paddingTop: "md",
  paddingBottom: "xl",
  backgroundColor: "white",
  overflow: "hidden",
};

export default function CModal({
  animated = true,
  exitingAnimation,
  enteringAnimation,
  statusBarTranslucent = true,
  transparent = true,
  placement = "center",
  title,
  closeButton = true,
  closeOnBackgroundPress = true,
  outerViewStyles: _outerViewStyles,
  innerViewStyles: _innerViewStyles,
  headerStyles,
  animationDuration = 300,
  isOpen,
  onClose,
  children,
  ...rest
}: CModalProps) {
  const [exitAnimationFinished, setExitAnimationFinished] = useState(true);

  const outerViewStyles: CViewStyle = useMemo(() => {
    let placementStyles: CViewStyle;
    switch (placement) {
      case "top":
        placementStyles = { justifyContent: "flex-start" };
        break;
      case "bottom":
        placementStyles = { justifyContent: "flex-end" };
        break;
      default:
        placementStyles = { justifyContent: "center" };
        break;
    }
    return { ...outerViewStyle, ...placementStyles, ..._outerViewStyles };
  }, [_outerViewStyles, placement]);

  const innerViewStyles: CViewStyle = useMemo(() => {
    let placementStyles: CViewStyle;
    switch (placement) {
      case "top":
        placementStyles = { borderBottomLeftRadius: 20, borderBottomRightRadius: 20, paddingTop: hasNotch() ? Constants.statusBarHeight : "md" };
        break;
      case "bottom":
        placementStyles = { borderTopLeftRadius: 20, borderTopRightRadius: 20 };
        break;
      default:
        placementStyles = { borderRadius: 10, width: "90%" };
        break;
    }
    return { ...innerViewStyle, ...placementStyles, ..._innerViewStyles };
  }, [_innerViewStyles, placement]);

  const exitAnimation = useMemo(() => {
    if (exitingAnimation) return exitingAnimation;
    switch (placement) {
      case "top":
        return SlideOutUp;
      case "bottom":
        return SlideOutDown;
      default:
        return ZoomOut;
    }
  }, [exitingAnimation, placement]);

  const enterAnimation = useMemo(() => {
    if (enteringAnimation) return enteringAnimation;
    switch (placement) {
      case "top":
        return SlideInUp;
      case "bottom":
        return SlideInDown;
      default:
        return ZoomIn;
    }
  }, [enteringAnimation, placement]);

  useEffect(() => {
    // When the modal is opened, set the exit animation finished to false so that the modal wont close before the exit animation is done
    // If the modal is not animated this is not necessary
    if (isOpen && animated) {
      setExitAnimationFinished(false);
    }
  }, [animated, isOpen]);

  const closeModal = () => {
    setExitAnimationFinished(true);
  };

  // Set this as exit animation so that the modal closes only after the animation is done. If not done the exit animation is not run and modal gets stuck
  const exitAnimationWithCallback = exitAnimation.withCallback((finished) => {
    "worklet";

    if (finished) {
      runOnJS(closeModal)();
    }
  });

  const innerViewProps: CViewProps = useMemo(
    () => ({
      style: innerViewStyles,
      onStartShouldSetResponder: () => true, // Prevents the outer onPress close to trigger when pressing modal body
    }),
    [innerViewStyles]
  );

  const body = useMemo(() => {
    return (
      <>
        {(title || closeButton) && (
          <CView
            style={{
              width: "100%",
              flexDirection: "row",
              justifyContent: title ? "space-between" : "flex-end",
              alignItems: "center",
              marginBottom: title ? "md" : 0,
              ...headerStyles,
            }}
          >
            {typeof title === "string" ? <CText style={{ flex: 1, color: "darkgray", fontWeight: "bold" }}>{title}</CText> : title}
            {typeof closeButton === "boolean"
              ? closeButton && (
                  <CButton variant="empty" onPress={onClose}>
                    <MaterialCommunityIcon name="close" size={25} />
                  </CButton>
                )
              : closeButton}
          </CView>
        )}
        {children}
      </>
    );
  }, [children, closeButton, headerStyles, onClose, title]);

  const views = useMemo(() => {
    return animated ? (
      <CAnimatedView entering={FadeIn.duration(animationDuration)} exiting={FadeOut.duration(animationDuration)} style={outerViewStyles}>
        <CAnimatedView
          entering={enterAnimation.duration(animationDuration)}
          exiting={exitAnimationWithCallback.duration(animationDuration)}
          {...innerViewProps}
        >
          {body}
        </CAnimatedView>
      </CAnimatedView>
    ) : (
      <CView style={outerViewStyles}>
        <CView {...innerViewProps}>{body}</CView>
      </CView>
    );
  }, [animated, animationDuration, body, enterAnimation, exitAnimationWithCallback, innerViewProps, outerViewStyles]);

  const bgRgba = hexToRgbA(COLORS.green);
  const targetBgColor = rgbaToString(blendColors("rgba(0,0,0,0.6)", bgRgba));

  const barColor = isOpen ? targetBgColor : bgRgba;

  return (
    <Modal statusBarTranslucent={false} transparent={transparent} visible={isOpen || !exitAnimationFinished} onRequestClose={onClose} {...rest}>
      {statusBarTranslucent && <StatusBar backgroundColor={barColor} animated />}
      {isOpen && (closeOnBackgroundPress ? <TouchableWithoutFeedback onPress={onClose}>{views}</TouchableWithoutFeedback> : views)}
    </Modal>
  );
}
