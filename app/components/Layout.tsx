import CKeyboardAvoidingView, { CKeyboardAvoidingViewProps } from "./primitives/CKeyboardAvoidingView";

export type LayoutProps = CKeyboardAvoidingViewProps & {
  avoidKeyboard?: boolean;
};

function Layout({ style, avoidKeyboard = true, ...props }: LayoutProps) {
  return <CKeyboardAvoidingView style={{ flex: 1, ...style }} behavior={avoidKeyboard ? "padding" : undefined} {...props} />;
}

export default Layout;
