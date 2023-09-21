import CKeyboardAvoidingView, { CKeyboardAvoidingViewProps } from "./primitives/CKeyboardAvoidingView";

export type LayoutProps = CKeyboardAvoidingViewProps;

function Layout({ style, ...props }: LayoutProps) {
  return <CKeyboardAvoidingView style={{ flex: 1, ...style }} {...props} />;
}

export default Layout;
