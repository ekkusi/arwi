import CKeyboardAvoidingView, { CKeyboardAvoidingViewProps } from "./primitives/CKeyboardAvoidingView";
import CView from "./primitives/CView";

export type LayoutProps = CKeyboardAvoidingViewProps & {
  avoidKeyboard?: boolean;
};

function Layout({ style, avoidKeyboard = true, ...props }: LayoutProps) {
  return avoidKeyboard ? <CView style={{ flex: 1, ...style }} {...props} /> : <CKeyboardAvoidingView style={{ flex: 1, ...style }} {...props} />;
}

export default Layout;
