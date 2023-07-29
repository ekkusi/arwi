import { useEffect, useMemo, useState } from "react";
import { Modal, ModalProps, TouchableWithoutFeedback } from "react-native";
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
import { CViewStyle } from "../theme/types";
import CAnimatedView from "./primitives/CAnimatedView";
import CView from "./primitives/CView";

type CModalProps = Omit<ModalProps, "visible" | "onRequestClose"> & {
  isOpen: boolean;
  placement?: "top" | "bottom" | "center";
  outerViewStyles?: CViewStyle;
  innerViewStyles?: CViewStyle;
  animated?: boolean;
  onClose?: () => void;
  exitingAnimation?: BaseAnimationBuilder | typeof BaseAnimationBuilder;
  enteringAnimation?: BaseAnimationBuilder | typeof BaseAnimationBuilder;
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
  backgroundColor: "white",
  borderTopLeftRadius: 20,
  borderTopRightRadius: 20,
  alignItems: "center",
};

export default function CModal({
  animated = true,
  exitingAnimation,
  enteringAnimation,
  statusBarTranslucent = true,
  transparent = true,
  placement = "center",
  outerViewStyles: _outerViewStyles,
  innerViewStyles: _innerViewStyles,
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
        placementStyles = { borderBottomLeftRadius: 20, borderBottomRightRadius: 20 };
        break;
      case "bottom":
        placementStyles = { borderTopLeftRadius: 20, borderTopRightRadius: 20 };
        break;
      default:
        placementStyles = { borderRadius: 20 };
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
        return ZoomIn;
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
        return ZoomOut;
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

  return (
    <Modal
      statusBarTranslucent={statusBarTranslucent}
      transparent={transparent}
      visible={isOpen || !exitAnimationFinished}
      onRequestClose={onClose}
      {...rest}
    >
      {animated ? (
        isOpen && (
          <TouchableWithoutFeedback onPress={onClose}>
            <CAnimatedView entering={FadeIn} exiting={FadeOut} style={outerViewStyles}>
              <TouchableWithoutFeedback>
                <CAnimatedView entering={enterAnimation} exiting={exitAnimationWithCallback} style={innerViewStyles}>
                  {children}
                </CAnimatedView>
              </TouchableWithoutFeedback>
            </CAnimatedView>
          </TouchableWithoutFeedback>
        )
      ) : (
        <TouchableWithoutFeedback onPress={onClose}>
          <CView style={outerViewStyles}>
            <TouchableWithoutFeedback>
              <CView style={innerViewStyles}>{children}</CView>
            </TouchableWithoutFeedback>
          </CView>
        </TouchableWithoutFeedback>
      )}
    </Modal>
  );
}
