import { useEffect, useRef, useState } from "react";
import { Keyboard, KeyboardEvent, Platform } from "react-native";

const KEYBOARD_SHOW_EVENT = Platform.OS === "ios" ? "keyboardWillShow" : "keyboardDidShow";
const KEYBOARD_CLOSE_EVENT = Platform.OS === "ios" ? "keyboardWillHide" : "keyboardDidHide";

export const useIsKeyboardVisible = () => {
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(KEYBOARD_SHOW_EVENT, () => {
      setKeyboardVisible(true); // or some other action
    });
    const keyboardDidHideListener = Keyboard.addListener(KEYBOARD_CLOSE_EVENT, () => {
      setKeyboardVisible(false); // or some other action
    });

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  return isKeyboardVisible;
};

type UseKeyboardListenerProps = {
  onShow?: (event: KeyboardEvent) => void;
  onHide?: (event: KeyboardEvent) => void;
};

export const useKeyboardListener = ({ onShow, onHide }: UseKeyboardListenerProps) => {
  // Run callbacks through refs so listeners dont need to be removed and added on every render
  const onHideRef = useRef(onHide);
  onHideRef.current = onHide; // Set current value again here to ensure it's up to date
  const onShowRef = useRef(onShow);
  onShowRef.current = onShow;

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(KEYBOARD_SHOW_EVENT, (event) => {
      onShowRef.current?.(event);
    });

    const keyboardDidHideListener = Keyboard.addListener(KEYBOARD_CLOSE_EVENT, (event) => {
      onHideRef.current?.(event);
    });

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);
};
